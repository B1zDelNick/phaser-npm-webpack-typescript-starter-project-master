import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {EffectUtils} from '../utils/effect.utils';
import {Animation} from '../utils/animation/anim';
import {TweenUtils} from '../utils/tween.utils';
import {Chest} from './template/dress/chest';
import {Doll} from './template/dress/doll';
import {AdUtils} from '../utils/ad/ad.utils';
import {isNull} from 'util';
import {ImageUtils} from '../utils/images/image.utils';

export default class Dress2 extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;
    private changing = false;

    private currentDoll: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private elza: Doll = null;
    private moana: Doll = null;
    private chest: Chest = null;
    private bg: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private girl: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private door: Phaser.Sprite = null;
    private mmmm: Phaser.Button = null;
    private blocker: Phaser.Graphics = null;

    private beginBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;
    private moreBtn: Phaser.Button = null;

    private elzaDressed: boolean = false;
    private moanaDressed: boolean = false;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.DRESS_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.DRESS_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.DRESS_STATE);
                break;
            }
        }
        this.elza = null;
        this.moana = null;
        this.changing = false;
        this.elzaDressed = false;
        this.moanaDressed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg5').getName());

        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBack').getName());
            this.door = this.game.add.sprite(444, 62, ImageUtils.getImageClass('ImagesDoor1').getName());
            this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesDoor').getName());
            this.mmmm = this.game.add.button(392 - 800, 66, ImageUtils.getImageClass('ImagesMmmm').getName(),
                GuiUtils.goLinkInMoreGames);
            this.mmmm.input.pixelPerfectAlpha = 10;
            this.mmmm.input.pixelPerfectOver = true;
            this.mmmm.input.pixelPerfectClick = true;
            this.mmmm.events.onInputOver.add(GuiUtils.addOverGlowHandler);
            this.mmmm.events.onInputOut.add(GuiUtils.addOutGlowHandler);
            this.mmmm.inputEnabled = true;
            this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesFront').getName());
        }

        // Chests
        this.chest = new Chest(this, -700)
            .configure({hideSelected: true})
            .background(0, 5,
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Chest)
            .page()
                .pageShelf(12, 87,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .pageShelf(8, 562,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .item(254, 80, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress2,
                    this.onItem)
                .item(119, 80, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress3,
                    this.onItem)
                .item(39, 79, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress4,
                    this.onItem)
                .item(1, 80, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress1,
                    this.onItem)
                .item(225, 476, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe4,
                    this.onItem)
                .item(128, 591, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe5,
                    this.onItem)
                .item(229, 603, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe6,
                    this.onItem)
            .build()
            .page()
                .pageShelf(12, 87,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .pageShelf(8, 562,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .item(110, 79, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jack1,
                    this.onItem)
                .item(161, 79, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot5,
                    this.onItem)
                .item(91, 79, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot6,
                    this.onItem)
                .item(5, 79, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot3,
                    this.onItem)
                .item(240, 588, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe1,
                    this.onItem)
                .item(130, 593, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe2,
                    this.onItem)
                .item(240, 489, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(12, 87,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(193, 81, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jack2,
                    this.onItem)
                .item(78, 81, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot1,
                    this.onItem)
                .item(78, 83, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot2,
                    this.onItem)
                .item(-4, 85, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot4,
                    this.onItem)
                .pageShelf(12, 404,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(199, 402, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top3,
                    this.onItem)
                .item(123, 400, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top4,
                    this.onItem)
                .item(66, 398, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top5,
                    this.onItem)
                .item(-6, 400, 'top7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top7,
                    this.onItem)
            .build()
            .page()
                .pageShelf(12, 87,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .pageShelf(8, 447,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .pageShelf(8, 573,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .item(-7, 74, 'bot7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot7,
                    this.onItem)
                .item(43, 85, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top1,
                    this.onItem)
                .item(68, 79, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top6,
                    this.onItem)
                .item(156, 82, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top2,
                    this.onItem)
                .item(200, 83, 'jack3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jack3,
                    this.onItem)
                .item(292, 323, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew1,
                    this.onItem)
                .item(223, 607, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag1,
                    this.onItem)
                .item(156, 346, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag2,
                    this.onItem)
                .item(147, 397, 'bag3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag3,
                    this.onItem)
                .item(126, 558, 'bag4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag4,
                    this.onItem)
                .item(284, 475, 'bag5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag5,
                    this.onItem)
                .item(189, 515, 'bag6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag6,
                    this.onItem)
                .item(236, 425, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Glass1,
                    this.onItem)
            .build()
            .page()
                .pageShelf(27, 413,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf3)
                .compoundItem(5, 1, -1, 45, 88, 'el_hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames, 'ElHair',
                    this.onItem)
                .compoundItem(5, 1, -1, 45, 88, 'mo_hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames, 'MoHair',
                    this.onItem)
            .build()
            .leftArrow(412, 580,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(412, 485,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .button(340, 0, 'el_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.ElBtn,
                this.changeDoll)
            .button(347, 103, 'mo_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.MoBtn,
                this.changeDoll)
            .build();

        this.chest.findItem('mo_hair').visible = false;

        // Dolls
        this.elza = new Doll(this, 520, 32)
            .layer(0, 0, 'hair_b',
                'AtlasesDollElza',
                'HB', 'HB')
            .layer(0, 0, 'jack_b',
                'AtlasesDollElza',
                'JkB', null, true)
            .layer(0, 0, 'body',
                'AtlasesDollElza',
                'Body', 'Body')
            .layer(0, 0, 'und',
                'AtlasesDollElza',
                'Und', 'Und')
            .layer(0, 0, 'shoe',
                'AtlasesDollElza',
                'S', null)
            .layer(0, 0, 'dress',
                'AtlasesDollElza',
                'D', null)
            .layer(0, 0, 'bot',
                'AtlasesDollElza',
                'B', null)
            .layer(0, 0, 'top',
                'AtlasesDollElza',
                'T', null)
            .layer(0, 0, 'jew',
                'AtlasesDollElza',
                'J', null, true)
            .layer(0, 0, 'jack',
                'AtlasesDollElza',
                'Jk', null, true)
            .layer(0, 0, 'bag',
                'AtlasesDollElza',
                'Bb', null, true)
            .layer(0, 0, 'head',
                'AtlasesDollElza',
                'Head', 'Head')
            .layer(0, 0, 'hair',
                'AtlasesDollElza',
                'H', 'H')
            .layer(0, 0, 'glass',
                'AtlasesDollElza',
                'Gs', null, true)
            .layer(0, 0, 'hand',
                'AtlasesDollElza',
                'Hand', 'Hand');
        this.moana = new Doll(this, 490, 40)
            .layer(0, 0, 'hair_b',
                'AtlasesDollMoana',
                'HB', 'HB')
            .layer(0, 0, 'jack_b',
                'AtlasesDollMoana',
                'JkB', null, true)
            .layer(0, 0, 'body',
                'AtlasesDollMoana',
                'Body', 'Body')
            .layer(0, 0, 'und',
                'AtlasesDollMoana',
                'Und', 'Und')
            .layer(0, 0, 'shoe',
                'AtlasesDollMoana',
                'S', null)
            .layer(0, 0, 'dress',
                'AtlasesDollMoana',
                'D', null)
            .layer(0, 0, 'bot',
                'AtlasesDollMoana',
                'B', null)
            .layer(0, 0, 'top',
                'AtlasesDollMoana',
                'T', null)
            .layer(0, 0, 'jew',
                'AtlasesDollMoana',
                'J', null, true)
            .layer(0, 0, 'jack',
                'AtlasesDollMoana',
                'Jk', null, true)
            .layer(0, 0, 'head',
                'AtlasesDollMoana',
                'Head', 'Head')
            .layer(0, 0, 'hair',
                'AtlasesDollMoana',
                'H', 'H')
            .layer(0, 0, 'bag',
                'AtlasesDollMoana',
                'Bb', null, true)
            .layer(0, 0, 'hand',
                'AtlasesDollMoana',
                'Hand', 'Hand')
            .layer(0, 0, 'glass',
                'AtlasesDollMoana',
                'Gs', null, true);

        this.girl = this.game.add.sprite(446 + 700, 15,
            ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Gr1);
        this.cloud = this.game.add.sprite(134, 72,
            ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Cl1);

        this.cloud.alpha = 0;
        this.elza.show(true);
        this.moana.hide(true);
        this.chest.disable();
        this.elza.getBody().x += 700;

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.moreBtn = this.gui.addExtraMore(
                960 - 191, 720 - 148,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE2,
            );
            this.addAnimation(this.moreBtn);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextMore, this);
        }
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        this.beginBtn = this.gui.addExtraBtn(270, 285,
            ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.GoBtn, () => {
                TweenUtils.fadeAndScaleOut(this.beginBtn);
                TweenUtils.fadeOut(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .5);
                TweenUtils.moveOut(this.girl, 446 + 700, 15, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                TweenUtils.moveIn(this.elza.getBody(), 520, 42, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
                    this.chest.show();
                    this.chest.enable();
                    let tw1 = this.game.add.tween(this.door).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 5000);
                    let tw2 = this.game.add.tween(this.mmmm).to({ x: 392 }, 1000, Phaser.Easing.Circular.Out, false, 0);
                    let tw3 = this.game.add.tween(this.mmmm).to({ x: 392 - 800 }, 1000, Phaser.Easing.Circular.In, false, 3000);
                    let tw4 = this.game.add.tween(this.door).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, false, 0);
                    tw1.chain(tw2);
                    tw2.chain(tw3);
                    tw3.chain(tw4);
                    tw4.chain(tw1);
                }, this);
            },
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        this.beginBtn.scale.setTo(0);
        this.beginBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Initalizations
        this.currentDoll = this.elza;

        // Animations goes here
        TweenUtils.moveIn(this.girl, 446, 15, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(this.beginBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3, () => {
            // Ad Calls
            if (GameConfig.PUB_MODE === PublishMode.NORMAL ||
                GameConfig.PUB_MODE === PublishMode.NO_BUTTONS ||
                GameConfig.PUB_MODE === PublishMode.NO_BUTTONS_ONE_AD ||
                GameConfig.PUB_MODE === PublishMode.DUW) {
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

    private counter: number = 0;
    private sp1: Phaser.Sprite = null;
    private sp2: Phaser.Sprite = null;
    private sp3: Phaser.Sprite = null;
    private sp4: Phaser.Sprite = null;
    private addAnimation(sprite) {
        this.sp1 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
        this.sp2 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
        this.sp3 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp3);
        this.sp4 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp4);
        this.sp1.alpha = 0;
        this.sp2.alpha = 0;
        this.sp3.alpha = 0;
        this.sp4.alpha = 0;
        this.sp1.anchor.setTo(.5);
        this.sp2.anchor.setTo(.5);
        this.sp3.anchor.setTo(.5);
        this.sp4.anchor.setTo(.5);
        sprite.addChild(this.sp1);
        sprite.addChild(this.sp2);
        sprite.addChild(this.sp3);
        sprite.addChild(this.sp4);
    }
    private nextMore() {
        this.counter++;
        if (this.counter > 1) this.counter = 0;
        if (this.counter === 1) {
            this.moreBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE);
            const t1 = this.game.add.tween(this.sp1).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, true).yoyo(true);
            const t2 = this.game.add.tween(this.sp2).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            const t3 = this.game.add.tween(this.sp3).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            const t4 = this.game.add.tween(this.sp4).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            t1.chain(t2);
            t2.chain(t3);
            t3.chain(t4);
            this.game.time.events.add(Phaser.Timer.SECOND *  2, this.nextMore, this);
        }
        else if (this.counter === 0) {
            this.moreBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE2);
            this.game.time.events.add(Phaser.Timer.SECOND *  3, this.nextMore, this);
        }
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentDoll.on('dress', index, 'top', 'bot', 'und'))
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            // this.currentDoll.on('dress_b', index);
            this.currentDoll.on('dress_f', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress', 'dress_f'))
                this.chest.onEquiped(name, 'top', 'dress');
            this.currentDoll.on('und', 0);
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress', 'dress_f'))
                this.chest.onEquiped(name, 'bot', 'dress');
            this.currentDoll.on('und', 0);
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.chest.onEquiped(name, 'shoe');
        }
        else if (name.indexOf('jew') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('jew', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('hat', index);
            this.currentDoll.on('hat_b', index);
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('acs', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('bag', index);
            // this.currentDoll.on('bag_b', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glove', index);
        }
        else if (name.indexOf('sock') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('sock', index);
        }
        else if (name.indexOf('jack') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('jack', index);
            this.currentDoll.on('jack_b', index);
        }
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glass', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(7));
            if (this.currentDoll.on('hair', index)) {
                // this.currentChest.onEquiped(name, 'hair');
            }
            this.currentDoll.on('hair_b', index);
        }

        if (this.currentDoll === this.elza) this.elzaDressed = true;
        if (this.currentDoll === this.moana) this.moanaDressed = true;

        if (this.playBtn.alpha === 0 && this.elzaDressed && this.moanaDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        if (sprite.name === 'el_btn' && this.currentDoll === this.elza) return;
        if (sprite.name === 'mo_btn' && this.currentDoll === this.moana) return;
        if (this.changing) return;
        this.changing = true;
        this.currentDoll.hide();
        if (this.currentDoll === this.elza) {
            this.currentDoll = this.moana;
            this.chest.findItem('el_hair').visible = false;
            this.chest.findItem('mo_hair').visible = true;
        } else {
            this.currentDoll = this.elza;
            this.chest.findItem('el_hair').visible = true;
            this.chest.findItem('mo_hair').visible = false;
        }
        this.game.time.events.add(Phaser.Timer.SECOND *  .5, () => {
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

        this.currentDoll = null;

        this.chest.dispose();

        if (this.bg) this.bg.destroy(true);
        if (this.cloud) this.cloud.destroy(true);
        if (this.girl) this.cloud.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_2 = this.elza.extract();
        GameConfig.DOLL_3 = this.moana.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.moveInOut(this.currentDoll.getBody(), this.currentDoll.getBody().x - 100, this.currentDoll.getBody().y, Phaser.Timer.SECOND * 1);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, () => {
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

