import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {IParticle} from './spec-effects/particle/i.particle';
import {GoldStarParticles} from './spec-effects/particle/gold.star.particle';
import {EffectUtils} from '../utils/effect.utils';
import Game = Phaser.Game;
import {CrossButton} from './template/final/cross.button';

export default class Final extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private girl: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private cross1: CrossButton = null;
    private cross2: CrossButton = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.FINAL_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.FINAL_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.FINAL_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.game.add.existing(GameConfig.CONT_1);
        GameConfig.CONT_1.scale.setTo(.75);
        GameConfig.CONT_1.position.setTo(75, 100);

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesFg7').getName());

        this.cross1 = new CrossButton(this, 'http://mycutegames.com/Games/Princess/Disney-Style-Vlog-First-Date.html');
        this.cross2 = new CrossButton(this, 'http://mycutegames.com/Games/Princess/Disney-Style-Vlog-Party-Prep.html');

        const doll1 = this.cross1
            .buttonAndReturn(239, 502, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross1, null, null);
        const doll2 = this.cross2
            .buttonAndReturn(500, 502, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross2, null, null);

        const btn1 = this.cross1
            .buttonAndReturn(357, 554, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.PlBtn,
                GuiUtils.addCustomOverHandler(0xff0099), GuiUtils.addOutHandler);
        const btn2 = this.cross2
            .buttonAndReturn(621, 554, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.PlBtn,
                GuiUtils.addCustomOverHandler(0xff0099), GuiUtils.addOutHandler);

        this.girl = this.game.add.sprite(711 + 500, 237,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Gr10);
        this.cloud = this.game.add.sprite(532, 183,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cl13);
        this.cloud.alpha = 0;

        // GUI Buttons
        this.gui.addGui(false);
        const playBtn = this.gui.addPlayBtn(this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;
        this.gui.addExtraMoreAnimated(
            960 - 168, 720 - 173,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1781833').getName(), 1 / 3, true,
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );
        const subscribe = this.gui.addExtraBtn(
            804, 156,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.SubBtn,
            GuiUtils.goLinkInMoreGames,
            GuiUtils.addCustomOverHandler(0xffff66),
            GuiUtils.addOutHandler
        );
        EffectUtils.makeScaleAnimation(subscribe);
        subscribe.filters = [EffectUtils.makeGlowAnimation(0xff0099)];

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.moveIn(this.girl, 711, 237, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.5);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2.5);

        // Assets Managment starts here
        // Nothing to Load Here, just enjoy :)
        this.nextPrepared = true;
        if (!GameConfig.IS_ASSETS_LOADED)
            GameConfig.IS_ASSETS_LOADED = true;
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.cloud) this.cloud.destroy(true);
        if (this.girl) this.girl.destroy(true);
        if (this.cross1) this.cross1.dispose();
        if (this.cross2) this.cross2.dispose();

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_2.dispose();
        GameConfig.DOLL_1 = null;
        GameConfig.DOLL_2 = null;
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(sprite: Phaser.Button): void {
        GameConfig.GAME_COMPLETED = true;
        GameConfig.CURRENT_STATE = 0;
        this.gui.disable();
        if (this.saver) {
            this.saver.setOnOutCallback(() => {
                this.game.time.events.removeAll();
                this.game.tweens.removeAll();
                this.reallyGoNextState(true);
            });
            this.saver.fadeOut();
        } else {
            this.blocker = this.game.add.graphics(0, 0);
            this.blocker.beginFill(0);
            this.blocker.drawRect(0, 0, 960, 720);
            this.blocker.inputEnabled = true;
            this.blocker.alpha = 0;
            this.game.camera.onFadeComplete.addOnce(() => {
                this.game.time.events.removeAll();
                this.game.tweens.removeAll();
                this.game.camera.fade(0x000000, 1, true, 0);
                this.blocker.alpha = .85;
                this.reallyGoNextState(true);
            }, this);
            this.game.camera.fade(0x000000, 500, true, .85);
        }
    }

    private reallyGoNextState(addLoader: boolean = false): void {
        if (this.nextPrepared) {
            this.game.state.start(this.NEXT);
        } else {
            if (addLoader) {
                this.spinner = this.game.add.sprite(
                    this.game.world.centerX,
                    this.game.world.centerY,
                    ImageUtils.getImageClass('ImagesSpin').getName());
                this.spinner.anchor.setTo(.5, .5);
                // this.spinner.scale.setTo(.5);
                TweenUtils.rotate(this.spinner, 360, Phaser.Timer.SECOND * 1, 0, -1);
            }
            this.game.time.events.add(Phaser.Timer.SECOND *  .25, this.reallyGoNextState, this);
        }
    }
}

