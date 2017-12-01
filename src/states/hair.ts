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

export default class Hair extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;
    private changing = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private mirror: Phaser.Sprite = null;
    private stars: Phaser.Sprite = null;
    private currentDoll: Doll = null;
    private currentChest: Chest = null;
    private snow: Doll = null;
    private cindy: Doll = null;
    private chestSnow: Chest = null;
    private chestCindy: Chest = null;
    private playBtn: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
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

        this.chestSnow = new Chest(this, -500)
            .configure({hideSelected: true})
            .background(0, 97,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Panel)
            .page()
                .item(30, 195, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.SnHair6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(53, 358, 'hair7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.SnHair7,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
            .build()
            .page()
                .item(37, 190, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.SnHair4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(41, 353, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.SnHair5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
            .build()
            .page()
                .item(40, 193, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.SnHair1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(13, 322, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.SnHair2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(131, 260, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.SnHair3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
            .build()
            .build();
        this.chestCindy = new Chest(this, -500)
            .configure({hideSelected: true})
            .background(0, 97,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Panel)
            .page()
                .item(-1, 213, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.CiHair3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(128, 219, 'hair7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.CiHair7,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
            .build()
            .page()
                .item(145, 222, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.CiHair4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(12, 216, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.CiHair5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
            .build()
            .page()
                .item(135, 220, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.CiHair1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(85, 368, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.CiHair2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
                .item(0, 210, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.CiHair6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xff33ff))
            .build()
            .build();

        this.btnContainer = this.game.add.group();
        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                140, 602, 1,
                'cat1', ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Cat1,
                true, true, true,
                this.onTool, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                382, 598, 1,
                'cat2', ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Cat2,
                true, true, true,
                this.onTool, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.btn3 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                595, 605, 1,
                'cat3', ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Cat3,
                true, true, true,
                this.onTool, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.btn4 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                245, 409, 1,
                'mmmm', ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Mmmm,
                true, true, true,
                GuiUtils.goLinkInMoreGames, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.snBtn =
            GuiUtils.makeButton(
                this, this.btnContainer,
                823, 402, 1,
                'arrow', ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.SnBtn,
                true, true, true,
                this.changeDoll, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.ciBtn =
            GuiUtils.makeButton(
                this, this.btnContainer,
                823, 402, 1,
                'arrow', ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.CinBtn,
                true, true, true,
                this.changeDoll, GuiUtils.addCustomOverHandler(0xff33ff), GuiUtils.addOutHandler);
        this.btn1.scale.setTo(0);
        this.btn2.scale.setTo(0);
        this.btn3.scale.setTo(0);
        this.btn4.scale.setTo(0);
        this.snBtn.scale.setTo(0);
        this.ciBtn.scale.setTo(0);
        this.btn1.alpha = 0;
        this.btn2.alpha = 0;
        this.btn3.alpha = 0;
        this.btn4.alpha = 0;
        this.snBtn.alpha = 0;
        this.ciBtn.alpha = 0;

        this.stars = this.game.add.sprite(268, 408,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Stars);
        this.stars.alpha = 0;

        // Initiations
        this.currentDoll = this.snow;
        this.currentChest = this.chestSnow;

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
        TweenUtils.fadeAndScaleIn(this.btn4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.9, () => {
            EffectUtils.makeAlphaAnimation(this.stars);
        }, this);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 3, () => {
            this.currentChest.show();
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
        if (cat.name === 'cat1') {
            page = 0;
        }
        else if (cat.name === 'cat2') {
            page = 1;
        }
        else if (cat.name === 'cat3') {
            page = 2;
        }
        this.currentChest.showPage(page);
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('hair', index);
            this.currentDoll.on('hair_b', index);
            if (this.currentDoll === this.snow) {
                if (GameConfig.DOLL_3 !== null) {
                    GameConfig.DOLL_3.on('hair', index);
                    GameConfig.DOLL_3.on('hair_b', index);
                }
                GameConfig.FREE_RESULT.snHair = index;
            }
            if (this.currentDoll === this.cindy) {
                if (GameConfig.DOLL_4 !== null) {
                    GameConfig.DOLL_4.on('hair', index);
                    GameConfig.DOLL_4.on('hair_b', index);
                }
                GameConfig.FREE_RESULT.ciHair = index;
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
        this.currentChest.hide();
        if (this.currentDoll === this.snow) {
            this.currentDoll = this.cindy;
            this.currentChest = this.chestCindy;
            TweenUtils.fadeAndScaleOut(this.ciBtn, Phaser.Timer.SECOND * .75);
            TweenUtils.fadeAndScaleIn(this.snBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        } else {
            this.currentDoll = this.snow;
            this.currentChest = this.chestSnow;
            TweenUtils.fadeAndScaleOut(this.snBtn, Phaser.Timer.SECOND * .75);
            TweenUtils.fadeAndScaleIn(this.ciBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        }
        this.game.time.events.add(Phaser.Timer.SECOND * .5, () => {
            this.currentDoll.show();
            this.currentChest.show();
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

        this.chestSnow.dispose();
        this.chestCindy.dispose();

        if (this.bg) this.bg.destroy(true);
        this.mirror.destroy(true);
        this.stars.destroy(true);
        this.btn1.destroy(true);
        this.btn2.destroy(true);
        this.btn3.destroy(true);
        this.btn4.destroy(true);
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
        if (GameConfig.CURRENT_STATE === 1) GameConfig.CURRENT_STATE++;
        this.gui.disable();
        this.currentChest.disable();
        this.currentChest.hide();
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

