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
import {FallParticles} from './spec-effects/particle/fall.particle';
import {EffectUtils} from '../utils/effect.utils';

export default class Final extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private cross1: Phaser.Button = null;
    private cross2: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;

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

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_1.setPosition(571, 60);
        GameConfig.DOLL_1.setScale(-.93, .93);
        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_2.setPosition(598, 64);
        GameConfig.DOLL_2.setScale(.93);
        GameConfig.DOLL_3.insert();
        GameConfig.DOLL_3.setPosition(439, 34);
        GameConfig.DECOR_1.insert();
        GameConfig.DECOR_1.setPosition(64, 110);
        GameConfig.DECOR_1.setScale(.562);
        GameConfig.DOLL_1.show(true);
        GameConfig.DOLL_2.show(true);

        this.btnContainer = this.game.add.group();

        this.cross1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                3, 335, 1,
                '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban1,
                true, true, true,
                GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boyfriends-Wardrobe-Inspired-Look.html'), GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        if (!GameConfig.GAME_COMPLETED) {
            this.cross2 =
                GuiUtils.makeButton(
                    this, this.btnContainer,
                    736, 335, 1,
                    '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.BanLock,
                    false, true, true,
                    null, null, null);
        }
        else {
            this.cross2 =
                GuiUtils.makeButton(
                    this, this.btnContainer,
                    736, 335, 1,
                    '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban1,
                    true, true, true,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princesses-Las-Vegas-Weekend.html'), GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        }

        this.cross1.scale.setTo(0);
        this.cross1.alpha = 0;
        this.cross2.scale.setTo(0);
        this.cross2.alpha = 0;

        // GUI Buttons
        this.gui.addGui(false);
        const playBtn = this.gui.addPlayBtn(this.nextState);
        this.gui.addExtraMoreAnimated(
            960 - 144, 720 - 144,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1441447').getName(), 7, true,
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.fadeAndScaleIn(this.cross1, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(this.cross2, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2.5);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3);

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
        if (this.btnContainer) this.btnContainer.destroy(true);
        if (this.cross1) this.cross1.destroy(true);
        if (this.cross2) this.cross2.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_2.dispose();
        GameConfig.DOLL_3.dispose();
        GameConfig.DECOR_1.dispose();

        GameConfig.DOLL_1 = null;
        GameConfig.DOLL_2 = null;
        GameConfig.DOLL_3 = null;
        GameConfig.DECOR_1 = null;
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

