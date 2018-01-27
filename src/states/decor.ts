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
import {DecorBackground} from './template/decor/decor.background';

export default class Decor extends Phaser.State {

    private NEXT = 'Dress';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private decor1: DecorBackground = null;
    private decor2: DecorBackground = null;
    private playBtn: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private btn5: Phaser.Button = null;

    private girl: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
    private cloud3: Phaser.Sprite = null;
    private cloud4: Phaser.Sprite = null;
    private cloud5: Phaser.Sprite = null;
    private cloud6: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private cat1: boolean = false;
    private cat2: boolean = false;
    private cat3: boolean = false;
    private cat4: boolean = false;

    private phase: number = 0;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.DECOR_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.DECOR_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.DECOR_STATE);
                break;
            }
        }
        this.cat1 = false;
        this.cat2 = false;
        this.cat3 = false;
        this.cat4 = false;
        this.phase = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.decor1 = new DecorBackground()
            .sprite(0, 0, ImageUtils.getImageClass('ImagesBg2').getName())
            .layer('pill', false)
                .item(525, 384,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Pill1)
                .item(525, 384,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Pill2)
                .item(523, 382,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Pill3)
                .item(525, 384,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Pill4)
                .item(525, 384,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Pill5)
            .build()
            .layer('curt', false)
                .item(292, 90,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Curt1)
                .item(292, 90,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Curt2)
                .item(292, 90,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Curt3)
                .item(292, 90,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Curt4)
                .item(292, 90,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Curt5)
            .build()
            .layer('carp', false)
                .item(49, 504,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Carp1)
                .item(0, 488,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Carp2)
                .item(3, 488,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Carp3)
                .item(5, 488,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Carp4)
                .item(34, 497,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Carp5)
            .build()
            .sprite(150, 441,
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Table)
            .layer('elem', false)
                .item(214, 399,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Elem1)
                .item(217, 446,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Elem2)
                .item(217, 439,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Elem3)
                .item(225, 422,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Elem4)
                .item(195, 409,
                    ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.Elem5)
            .build();

        this.girl = this.game.add.sprite(643 + 700, 110,
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').Frames.Girl1);
        this.cloud1 = this.game.add.sprite(459, 123,
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').Frames.Cloud1);
        this.cloud2 = this.game.add.sprite(459, 123,
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').Frames.Cloud2);
        this.cloud3 = this.game.add.sprite(459, 123,
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').Frames.Cloud3);
        this.cloud4 = this.game.add.sprite(459, 123,
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').Frames.Cloud4);
        this.cloud5 = this.game.add.sprite(459, 123,
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').Frames.Cloud5);
        this.cloud6 = this.game.add.sprite(459, 123,
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecorComix').Frames.Cloud6);
        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;
        this.cloud3.alpha = 0;
        this.cloud4.alpha = 0;
        this.cloud5.alpha = 0;
        this.cloud6.alpha = 0;

        this.btnContainer = this.game.add.group();

        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                253, 619, 1,
                'curt', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.CurtBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                343, 619, 1,
                'pill', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.PillBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn3 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                433, 619, 1,
                'carp', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.CarpBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn4 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                523, 619, 1,
                'elem', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.ElemBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn5 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                613, 619, 1,
                'mmmm', ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.MmmmBtn,
                GameConfig.PUB_MODE === PublishMode.NORMAL, true, GameConfig.PUB_MODE === PublishMode.NORMAL,
                GuiUtils.goLinkInMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn1.scale.setTo(0);
        this.btn2.scale.setTo(0);
        this.btn3.scale.setTo(0);
        this.btn4.scale.setTo(0);
        this.btn5.scale.setTo(0);
        this.btn1.alpha = 0;
        this.btn2.alpha = 0;
        this.btn3.alpha = 0;
        this.btn4.alpha = 0;
        this.btn5.alpha = 0;

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(759, 570,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE2121565').getName(),
                [0, 1, 2, 3, 4, 5], 8, true);
        }
        this.playBtn = this.gui.addPlayBtn(() => {
            /*if (this.phase === 0) {
                this.phase++;
                TweenUtils.fadeAndScaleOut(this.playBtn);
                TweenUtils.moveOut(this.btn1, this.btn1.x, this.btn1.y + 500, 1000, 300);
                TweenUtils.moveOut(this.btn2, this.btn2.x, this.btn2.y + 500, 1000, 300);
                TweenUtils.moveOut(this.btn3, this.btn3.x, this.btn3.y + 500, 1000, 300);
                TweenUtils.moveOut(this.btn4, this.btn4.x, this.btn4.y + 500, 1000, 300, () => {
                    TweenUtils.fadeAndScaleIn(this.playBtn, 750);
                }, this);
            }
            else {
                this.nextState();
            }*/
        });
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.slideIn(this.girl, 643, 1000, 1000);
        TweenUtils.fadeIn(this.cloud1, 500, 2000);
        TweenUtils.fadeIn(this.cloud2, 500, 4500);
        TweenUtils.fadeIn(this.cloud3, 500, 7000, () => {
            TweenUtils.fadeAndScaleIn(this.btn1, 750, 250);
            TweenUtils.fadeAndScaleIn(this.btn2, 750, 500);
            TweenUtils.fadeAndScaleIn(this.btn3, 750, 750);
            TweenUtils.fadeAndScaleIn(this.btn4, 750, 1000);
            TweenUtils.fadeAndScaleIn(this.btn5, 750, 1250);
            TweenUtils.slideOut(this.girl, 643 + 700, 1000, 2000);
            this.cloud1.visible = false;
            this.cloud2.visible = false;
            TweenUtils.fadeOut(this.cloud3, 500, 2000);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // ADS
        if (GameConfig.PUB_MODE === PublishMode.NORMAL || GameConfig.PUB_MODE === PublishMode.NO_BUTTONS) {
            AdUtils.playAds();
        }
    }

    onTool(sprite: Phaser.Button) {
        const name = sprite.name;
        this.decor1.next(name);
        if (name === 'pill') this.cat1 = true;
        if (name === 'curt') this.cat2 = true;
        if (name === 'carp') this.cat3 = true;
        if (name === 'elem') this.cat4 = true;
        if (this.cat1 && this.cat2 && this.cat3 && this.cat4) {
            if (this.playBtn.alpha === 0) {
                TweenUtils.customFadeAndScaleIn(this.playBtn, 1, 1.3, 750);
            }
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        if (this.bg) this.bg.destroy(true);
        this.btn1.destroy(true);
        this.btn2.destroy(true);
        this.btn3.destroy(true);
        this.btn4.destroy(true);
        this.btn5.destroy(true);
        this.btnContainer.destroy(true);
        this.girl.destroy(true);
        this.cloud1.destroy(true);
        this.cloud2.destroy(true);
        this.cloud3.destroy(true);
        this.cloud4.destroy(true);
        this.cloud5.destroy(true);
        this.cloud6.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
        GameConfig.DECOR_1 = this.decor1.extract();
        GameConfig.DECOR_2 = this.decor2.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.CURRENT_STATE++;
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

