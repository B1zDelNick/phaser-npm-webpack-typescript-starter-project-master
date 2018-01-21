import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {EffectUtils} from '../utils/effect.utils';
import {AdUtils} from '../utils/ad/ad.utils';
import {SoundUtils} from '../utils/sound/sound.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {ILaser} from './spec-effects/laser/i.laser';

export default class Result extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private cont: Phaser.Group = null;
    private bg: Phaser.Sprite = null;
    private fg: Phaser.Sprite = null;
    private lll: Phaser.Graphics = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.RESULT_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.RESULT_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.RESULT_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.cont = this.game.add.group();
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4' + this.game.rnd.between(1, 3)).getName());
        this.cont.add(this.bg);

        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_3.insert();
        this.cont.add(GameConfig.DOLL_1.getBody());
        this.cont.add(GameConfig.DOLL_2.getBody());
        this.cont.add(GameConfig.DOLL_3.getBody());
        GameConfig.DOLL_1.setPosition(135, 110);
        GameConfig.DOLL_2.setPosition(320, 110);
        GameConfig.DOLL_3.setPosition(516, 110);
        GameConfig.DOLL_1.setAlpha(0);
        GameConfig.DOLL_2.setAlpha(0);
        GameConfig.DOLL_3.setAlpha(0);

        this.lll = this.game.add.graphics(0, 0);
        this.lll.beginFill(0xffffff);
        this.lll.drawRect(0, 0, 960, 720);
        this.lll.alpha = 0;

        this.fg = this.game.add.sprite(-43, -14, ImageUtils.getImageClass('ImagesFg4').getName());

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(960 - 161, 720 - 152,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE16115223').getName(),
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 8, true);
        }
        const playBtn = this.gui.addExtraBtn(363, 593,
            ImageUtils.getAtlasClass('AtlasesStateResult').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult').Frames.PhtBtn,
            () => {
                TweenUtils.fadeAndScaleOut(playBtn, 500, 0, () => {
                    EffectUtils.makeShootAnimation(this.lll);
                    TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.nextState, this);
                }, this);
            }, GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler
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
        TweenUtils.fadeIn(GameConfig.DOLL_1.getBody(), Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeIn(GameConfig.DOLL_2.getBody(), Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.5);
        TweenUtils.fadeIn(GameConfig.DOLL_3.getBody(), Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(playBtn, 750, 3000, () => {
            EffectUtils.makeScaleAnimation(playBtn, 1.05, 750);
            // Ad Calls
            if (GameConfig.PUB_MODE === PublishMode.NORMAL ||
                GameConfig.PUB_MODE === PublishMode.NO_BUTTONS) {
                AdUtils.playAds();
            }
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadFinalState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        // this.bg.destroy(true);
        this.fg.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        /*GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_2.dispose();
        GameConfig.DOLL_3.dispose();
        GameConfig.DOLL_1 = null;
        GameConfig.DOLL_2 = null;
        GameConfig.DOLL_3 = null;*/
        GameConfig.CONT_1 = this.cont;
        this.game.world.remove(GameConfig.CONT_1);
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
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

