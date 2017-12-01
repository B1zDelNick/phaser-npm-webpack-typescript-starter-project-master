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
import {Doll} from './template/dress/doll';
import {Chest} from './template/dress/chest';

export default class Make extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;
    private changing = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private mirror: Phaser.Sprite = null;
    private stars: Phaser.Sprite = null;
    private currentDoll: Doll = null;
    private snow: Doll = null;
    private cindy: Doll = null;
    private chest: Chest = null;
    private playBtn: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private btn5: Phaser.Button = null;
    private snBtn: Phaser.Button = null;
    private ciBtn: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private snowDressed: boolean = false;
    private cindyDressed: boolean = false;

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
        this.snow = null;
        this.cindy = null;
        this.changing = false;
        this.snowDressed = false;
        this.cindyDressed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.mirror = this.game.add.sprite(380, 43,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mirror);

        if (GameConfig.DOLL_1 !== null) {
            this.snow = GameConfig.DOLL_1.insert();
            this.cindy = GameConfig.DOLL_2.insert();
        }
        else {
            this.snow = new Doll(this, 380, 43)
                .layer(0, 0, 'hair_b',
                    'AtlasesDollMakeSnow',
                    'HB', 'HB')
                .layer(0, 0, 'body',
                    'AtlasesDollMakeSnow',
                    'Body', 'Body')
                .layer(0, 0, 'rum',
                    'AtlasesDollMakeSnow',
                    'Rm', null)
                .layer(0, 0, 'lip',
                    'AtlasesDollMakeSnow',
                    'Lp', 'Lp')
                .layer(0, 0, 'shad',
                    'AtlasesDollMakeSnow',
                    'Sh', 'Sh')
                .layer(0, 0, 'eyes',
                    'AtlasesDollMakeSnow',
                    'Eyes', 'Eyes')
                .layer(0, 0, 'res',
                    'AtlasesDollMakeSnow',
                    'Rs', 'Rs')
                .layer(0, 0, 'dress',
                    'AtlasesDollMakeSnow',
                    'Dress', 'Dress')
                .layer(0, 0, 'hair',
                    'AtlasesDollMakeSnow',
                    'H', 'H');
            this.cindy = new Doll(this, 380, 43)
                .layer(0, 0, 'hair_b',
                    'AtlasesDollMakeCindy',
                    'HB', 'HB')
                .layer(0, 0, 'body',
                    'AtlasesDollMakeCindy',
                    'Body', 'Body')
                .layer(0, 0, 'rum',
                    'AtlasesDollMakeCindy',
                    'Rm', null)
                .layer(0, 0, 'lip',
                    'AtlasesDollMakeCindy',
                    'Lp', 'Lp')
                .layer(0, 0, 'shad',
                    'AtlasesDollMakeCindy',
                    'Sh', 'Sh')
                .layer(0, 0, 'eyes',
                    'AtlasesDollMakeCindy',
                    'Eyes', 'Eyes')
                .layer(0, 0, 'res',
                    'AtlasesDollMakeCindy',
                    'Rs', 'Rs')
                .layer(0, 0, 'dress',
                    'AtlasesDollMakeCindy',
                    'Dress', 'Dress')
                .layer(0, 0, 'hair',
                    'AtlasesDollMakeCindy',
                    'H', 'H');
        }

        this.snow.show(true);
        this.cindy.hide(true);

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesFg3').getName());

        this.chest = new Chest(this, -500)
            .background(0, 97,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Panel)
            .page()
                .item(64, 224, 'lip1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lip1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(92, 315, 'lip2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lip2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(6, 203, 'lip3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lip3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(6, 331, 'lip4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lip4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(71, 406, 'lip5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lip5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
            .build()
            .page()
                .item(3, 246, 'res1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Res1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(130, 312, 'res2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Res2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(10, 342, 'res3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Res3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(69, 400, 'res4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Res4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(116, 210, 'res5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Res5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
            .build()
            .page()
                .item(76, 308, 'shad1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shad1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(76, 248, 'shad2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shad2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(76, 368, 'shad3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shad3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(76, 186, 'shad4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shad4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(76, 426, 'shad5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shad5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
            .build()
            .page()
                .item(9, 202, 'rum1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rum1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(134, 202, 'rum2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rum2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(127, 307, 'rum3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rum3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(20, 307, 'rum4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rum4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(56, 389, 'rum5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rum5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
            .build()
            .build();

        this.btnContainer = this.game.add.group();
        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                210, 494, 1,
                'lip', ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.LipBtn,
                true, true, true,
                this.onTool, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                306, 494, 1,
                'rum', ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.RumBtn,
                true, true, true,
                this.onTool, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.btn3 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                489, 446, 1,
                'res', ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ResBtn,
                true, true, true,
                this.onTool, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.btn4 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                573, 498, 1,
                'shad', ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ShadBtn,
                true, true, true,
                this.onTool, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.btn5 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                664, 310, 1,
                'shad', ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
                true, true, true,
                GuiUtils.goLinkInMoreGames, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.snBtn =
            GuiUtils.makeButton(
                this, this.btnContainer,
                823, 402, 1,
                'arrow', ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.SnBtn,
                true, true, true,
                this.changeDoll, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.ciBtn =
            GuiUtils.makeButton(
                this, this.btnContainer,
                823, 402, 1,
                'arrow', ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.CinBtn,
                true, true, true,
                this.changeDoll, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.btn1.scale.setTo(0);
        this.btn2.scale.setTo(0);
        this.btn3.scale.setTo(0);
        this.btn4.scale.setTo(0);
        this.btn5.scale.setTo(0);
        this.snBtn.scale.setTo(0);
        this.ciBtn.scale.setTo(0);
        this.btn1.alpha = 0;
        this.btn2.alpha = 0;
        this.btn3.alpha = 0;
        this.btn4.alpha = 0;
        this.btn5.alpha = 0;
        this.snBtn.alpha = 0;
        this.ciBtn.alpha = 0;

        this.stars = this.game.add.sprite(654, 356,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Stars);
        this.stars.alpha = 0;

        // Initiations
        this.currentDoll = this.snow;

        // GUI Buttons
        this.gui.addGui();
        this.playBtn = this.gui.addPlayBtn(this.nextState);
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
        TweenUtils.fadeAndScaleIn(this.btn1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(this.btn2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.3);
        TweenUtils.fadeAndScaleIn(this.btn3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.6);
        TweenUtils.fadeAndScaleIn(this.btn4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.9);
        TweenUtils.fadeAndScaleIn(this.btn5, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3.2, () => {
            EffectUtils.makeAlphaAnimation(this.stars);
        }, this);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 3, () => {
            this.chest.show();
            TweenUtils.fadeAndScaleIn(this.ciBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        }, this);
        TweenUtils.fadeAndScaleIn(this.ciBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 4);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private onTool(cat: Phaser.Button): void {
        let page: number;
        if (cat.name === 'lip') {
            page = 0;
        }
        else if (cat.name === 'res') {
            page = 1;
        }
        else if (cat.name === 'shad') {
            page = 2;
        }
        else if (cat.name === 'rum') {
            page = 3;
        }
        this.chest.showPage(page);
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('lip') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('lip', index);
            if (this.currentDoll === this.snow) {
                if (GameConfig.DOLL_3 !== null) {
                    GameConfig.DOLL_3.on('lip', index);
                }
                GameConfig.FREE_RESULT.snLip = index;
            }
            if (this.currentDoll === this.cindy) {
                if (GameConfig.DOLL_4 !== null) {
                    GameConfig.DOLL_4.on('lip', index);
                }
                GameConfig.FREE_RESULT.ciLip = index;
            }
        }
        else if (name.indexOf('res') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('res', index);
            if (this.currentDoll === this.snow) {
                if (GameConfig.DOLL_3 !== null) {
                    GameConfig.DOLL_3.on('res', index);
                }
                GameConfig.FREE_RESULT.snRes = index;
            }
            if (this.currentDoll === this.cindy) {
                if (GameConfig.DOLL_4 !== null) {
                    GameConfig.DOLL_4.on('res', index);
                }
                GameConfig.FREE_RESULT.ciRes = index;
            }
        }
        else if (name.indexOf('rum') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('rum', index);
            if (this.currentDoll === this.snow) {
                if (GameConfig.DOLL_3 !== null) {
                    GameConfig.DOLL_3.on('rum', index);
                }
                GameConfig.FREE_RESULT.snRum = index;
            }
            if (this.currentDoll === this.cindy) {
                if (GameConfig.DOLL_4 !== null) {
                    GameConfig.DOLL_4.on('rum', index);
                }
                GameConfig.FREE_RESULT.ciRum = index;
            }
        }
        else if (name.indexOf('shad') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('shad', index);
            if (this.currentDoll === this.snow) {
                if (GameConfig.DOLL_3 !== null) {
                    GameConfig.DOLL_3.on('shad', index);
                }
                GameConfig.FREE_RESULT.snShad = index;
            }
            if (this.currentDoll === this.cindy) {
                if (GameConfig.DOLL_4 !== null) {
                    GameConfig.DOLL_4.on('shad', index);
                }
                GameConfig.FREE_RESULT.ciShad = index;
            }
        }

        if (this.currentDoll === this.snow) this.snowDressed = true;
        if (this.currentDoll === this.cindy) this.cindyDressed = true;

        if (this.playBtn.alpha === 0 && this.snowDressed && this.cindyDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        if (sprite === this.snBtn && this.currentDoll === this.snow) return;
        if (sprite === this.ciBtn && this.currentDoll === this.cindy) return;
        if (this.changing) return;
        this.changing = true;
        this.currentDoll.hide();
        if (this.currentDoll === this.snow) {
            this.currentDoll = this.cindy;
            TweenUtils.fadeAndScaleOut(this.ciBtn, Phaser.Timer.SECOND * .75);
            TweenUtils.fadeAndScaleIn(this.snBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        } else {
            this.currentDoll = this.snow;
            TweenUtils.fadeAndScaleOut(this.snBtn, Phaser.Timer.SECOND * .75);
            TweenUtils.fadeAndScaleIn(this.ciBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        }
        this.game.time.events.add(Phaser.Timer.SECOND * .5, () => {
            this.currentDoll.show();
            this.game.time.events.add(Phaser.Timer.SECOND *  1, () => {
                this.changing = false;
            }, this);
        }, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.chest.dispose();

        if (this.bg) this.bg.destroy(true);
        this.mirror.destroy(true);
        this.stars.destroy(true);
        this.btn1.destroy(true);
        this.btn2.destroy(true);
        this.btn3.destroy(true);
        this.btn4.destroy(true);
        this.btn5.destroy(true);
        this.snBtn.destroy(true);
        this.ciBtn.destroy(true);

        this.btnContainer.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1 = this.snow.extract();
        GameConfig.DOLL_2 = this.cindy.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        if (GameConfig.CURRENT_STATE === 0) GameConfig.CURRENT_STATE++;
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
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
        }, this);
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

