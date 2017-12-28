import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {ILaser} from './spec-effects/laser/i.laser';
import {EffectUtils} from '../utils/effect.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {Animation} from '../utils/animation/anim';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';

export default class Comix2 extends Phaser.State {

    private NEXT = 'Dress2';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private girl3: Phaser.Sprite = null;
    private girl4: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
    private cloud3: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.COMIX_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.COMIX_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.COMIX_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg2').getName());

        this.girl1 = this.game.add.sprite(-36, 52,
            ImageUtils.getAtlasClass('AtlasesStateComix2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix2').Frames.Gr1);
        this.girl2 = this.game.add.sprite(223, 55,
            ImageUtils.getAtlasClass('AtlasesStateComix2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix2').Frames.Gr2);

        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_1.setPosition(422, 49);

        this.girl4 = this.game.add.sprite(594 + 700, 23,
            ImageUtils.getAtlasClass('AtlasesStateComix2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix2').Frames.Gr4);
        this.cloud1 = this.game.add.sprite(212, 191,
            ImageUtils.getAtlasClass('AtlasesStateComix2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix2').Frames.Cl1);
        this.cloud2 = this.game.add.sprite(212, 191,
            ImageUtils.getAtlasClass('AtlasesStateComix2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix2').Frames.Cl2);
        this.cloud3 = this.game.add.sprite(212, 191,
            ImageUtils.getAtlasClass('AtlasesStateComix2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix2').Frames.Cl3);

        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;
        this.cloud3.alpha = 0;

        this.girl1.position.setTo(422, 180);
        this.girl1.scale.setTo(.292);
        this.girl1.alpha = 0;
        this.girl2.position.setTo(445, 180);
        this.girl2.scale.setTo(.305);
        this.girl2.alpha = 0;
        GameConfig.DOLL_1.setPosition(449, 180);
        GameConfig.DOLL_1.setScale(.301);
        GameConfig.DOLL_1.setAlpha(0);

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(698, 544,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE37124828').getName(),
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 10, true);
        }
        const playBtn = this.gui.addExtraBtn(-25, 567,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.DoneBtn,
            this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this, 386, 342);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.fadeIn(this.girl1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2, () => {
            TweenUtils.moveAndScaleAndFade(this.girl1, 265, 52, 1, 1, Phaser.Timer.SECOND * 2, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.move(this.girl1, -36, 52, Phaser.Timer.SECOND * 1);
            }, this);
        }, this);
        TweenUtils.fadeIn(this.girl2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 5, () => {
            TweenUtils.moveAndScaleAndFade(this.girl2, 343, 64, 1, 1, Phaser.Timer.SECOND * 2, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.move(this.girl2, 223, 55, Phaser.Timer.SECOND * 1);
            }, this);
        }, this);
        TweenUtils.fadeIn(GameConfig.DOLL_1.getBody(), Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 9, () => {
            TweenUtils.moveAndScaleAndFade(GameConfig.DOLL_1.getBody(), 360, 38, 1, 1, Phaser.Timer.SECOND * 2, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.move(GameConfig.DOLL_1.getBody(), 422, 49, Phaser.Timer.SECOND * 1);
            }, this);
        }, this);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
        TweenUtils.slideIn(this.girl4, 594, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 12, () => {
            TweenUtils.fadeIn(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.fadeOut(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
            }, this);
            TweenUtils.fadeIn(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 4, () => {
                TweenUtils.fadeOut(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
            }, this);
            TweenUtils.fadeIn(this.cloud3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 8, () => {
            }, this);
        }, this);

        // Assets Managment starts here
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress1State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.girl1.destroy(true);
        this.girl2.destroy(true);
        this.girl4.destroy(true);
        this.cloud1.destroy(true);
        this.cloud2.destroy(true);
        this.cloud3.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
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

