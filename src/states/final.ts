import * as Assets from '../assets';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {EffectUtils} from '../utils/effect.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {CrossButton} from './template/final/cross.button';

export default class Final extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private cross1: CrossButton = null;
    private cross2: CrossButton = null;
    private cross3: CrossButton = null;
    private label: Phaser.Sprite = null;
    private pl1: Phaser.Button = null;
    private pl2: Phaser.Button = null;
    private pl3: Phaser.Button = null;

    private bg: Phaser.Sprite = null;
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

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName());

        this.cross1 = new CrossButton(this, 'http://freegamescasual.com/Free-Online-Games/Princesses/Princesses-Fashion-Designers-Battle-play.html');
        this.cross2 = new CrossButton(this, 'http://freegamescasual.com/Free-Online-Games/Princesses/Winter-Warming-Tips-for-Princesses-play.html');
        this.cross3 = new CrossButton(this, 'http://freegamescasual.com/Free-Online-Games/Princesses/Princess-Black-Friday-Rush-play.html');

        this.cross1
            .button(-8, -17, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross1, null, null);
        this.pl1 =
            this.cross1.buttonAndReturn(73, 435, 1,
                ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.PlayFgc,
                GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler);
        this.cross2
            .button(327, -17, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross2, null, null);
        this.pl2 =
            this.cross2.buttonAndReturn(409, 435, 1,
                ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.PlayFgc,
                GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler);
        this.cross3
            .button(633, -17, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross3, null, null);
        this.pl3 =
            this.cross3.buttonAndReturn(737, 435, 1,
                ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.PlayFgc,
                GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler);

        this.label = this.game.add.sprite(215, 594 + 700,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Label);

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW, true);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(
                960 - 157, 720 - 157,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621624').getName(), 5, true,
                GuiUtils.addOverHandler,
                GuiUtils.addOutHandler
            );
        }
        const playBtn = this.gui.addPlayBtn(this.nextState);
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
        EffectUtils.makeScaleAnimation(this.pl1);
        EffectUtils.makeScaleAnimation(this.pl2);
        EffectUtils.makeScaleAnimation(this.pl3);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
        TweenUtils.moveIn(this.label, 215, 594, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);

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

        this.bg.destroy(true);
        this.label.destroy(true);
        this.cross1.dispose();
        this.cross2.dispose();
        this.cross3.dispose();

        if (this.spinner) this.spinner.destroy(true);
        if (this.spinner) this.spinner.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_2.dispose();
        GameConfig.DOLL_3.dispose();
        GameConfig.DOLL_4.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.GAME_COMPLETED = true;
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

