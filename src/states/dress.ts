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

export default class Dress extends Phaser.State {

    private NEXT = 'Drag';
    private nextPrepared = false;
    private changing = false;

    private currentDoll: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private ariel: Doll = null;
    private moana: Doll = null;
    private chest: Chest = null;
    private bg: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private girl: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private beginBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;
    private g1: Phaser.Sprite = null;
    private g2: Phaser.Sprite = null;
    private g3: Phaser.Sprite = null;
    private moreB: Phaser.Button = null;
    private moreState: number = 0;

    private arielDressed: boolean = false;
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

        this.ariel = null;
        this.moana = null;
        this.changing = false;
        this.arielDressed = false;
        this.moanaDressed = false;
        this.moreState = -1;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        // Chests
        this.chest = new Chest(this, 0)
            // .configure({hideSelected: true})
            .background(0, 0,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .item(153, 561, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe1,
                    this.onItem)
                .item(294, 543, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe2,
                    this.onItem)
                .item(255, 139, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress3,
                    this.onItem)
                .item(226, 118, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress5,
                    this.onItem)
                .item(150, 94, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress2,
                    this.onItem)
                .item(43, 65, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack1,
                    this.onItem)
            .build()
            .page()
                .item(146, 536, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe4,
                    this.onItem)
                .item(299, 528, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe3,
                    this.onItem)
                .item(307, 143, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress6,
                    this.onItem)
                .item(229, 124, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress4,
                    this.onItem)
                .item(165, 97, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress1,
                    this.onItem)
                .item(44, 69, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack2,
                    this.onItem)
                .item(295, 393, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag2,
                    this.onItem)
            .build()
            .page()
                .item(295, 528, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe6,
                    this.onItem)
                .item(141, 563, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe5,
                    this.onItem)
                .item(312, 139, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot4,
                    this.onItem)
                .item(248, 121, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot3,
                    this.onItem)
                .item(176, 107, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top4,
                    this.onItem)
                .item(135, 90, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top3,
                    this.onItem)
                .item(41, 62, 'jack3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack3,
                    this.onItem)
                .item(310, 471, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat1,
                    this.onItem)
                .item(202, 414, 'bag4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag4,
                    this.onItem)
            .build()
            .page()
                .item(298, 533, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe7,
                    this.onItem)
                .item(140, 561, 'shoe8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shoe8,
                    this.onItem)
                .item(338, 144, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag1,
                    this.onItem)
                .item(274, 128, 'bag3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag3,
                    this.onItem)
                .item(180, 101, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot1,
                    this.onItem)
                .item(140, 84, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot2,
                    this.onItem)
                .item(62, 75, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top1,
                    this.onItem)
                .item(40, 54, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top2,
                    this.onItem)
                .item(366, 405, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew2,
                    this.onItem)
                .item(260, 393, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew1,
                    this.onItem)
                .item(169, 440, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew3,
                    this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
                .pageShelf(85, 541,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf)
                .item(106, 103, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Cross,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boho-Wedding-Rivals.html'))
                .item(298, 385, 'mmmm_btn',
                    ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.PlayDu,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boho-Wedding-Rivals.html'),
                    GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
                .build()
            .static()
                .compoundItem(5, 1, -1, 30, 270, 'ar_hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'ArHair',
                    this.onItem)
                .compoundItem(5, 1, -1, 30, 270, 'mo_hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'MoHair',
                    this.onItem)
            .build()
            .leftArrow(444, 415,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(444, 343,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .button(259, 10, 'ar_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBtn,
                this.changeDoll)
            .button(344, 40, 'mo_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.MoBtn,
                this.changeDoll)
            .build();

        this.chest.findItem('mo_hair').visible = false;

        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            // EffectUtils.makeScaleAnimation(this.chestJas.findItem('mmmm_btn'), 1.05, 500);
            this.chest.findItem('mmmm_btn').scale.setTo(.81);
            EffectUtils.makeScaleAnimation(this.chest.findItem('mmmm_btn'), .85, 500);
        }

        // Dolls
        this.ariel = new Doll(this, 506, 3)
            .layer(0, 0, 'hair_b',
                'AtlasesDollAriel',
                'HB', 'HB')
            .layer(0, 0, 'bag_b',
                'AtlasesDollAriel',
                'BbB', null, true)
            .layer(0, 0, 'jack_b',
                'AtlasesDollAriel',
                'JkB', null, true)
            .layer(0, 0, 'top_b',
                'AtlasesDollAriel',
                'TB', null, true)
            .layer(0, 0, 'dress_b',
                'AtlasesDollAriel',
                'DB', null, true)
            .layer(0, 0, 'body',
                'AtlasesDollAriel',
                'Body', 'Body')
            .layer(0, 0, 'und',
                'AtlasesDollAriel',
                'Und', 'Und')
            .layer(0, 0, 'jew_b',
                'AtlasesDollAriel',
                'JB', null, true)
            .layer(0, 0, 'shoe',
                'AtlasesDollAriel',
                'S', null)
            .layer(0, 0, 'dress',
                'AtlasesDollAriel',
                'D', null)
            .layer(0, 0, 'bot',
                'AtlasesDollAriel',
                'B', null)
            .layer(0, 0, 'top',
                'AtlasesDollAriel',
                'T', null)
            .layer(0, 0, 'jew',
                'AtlasesDollAriel',
                'J', null, true)
            .layer(0, 0, 'jack',
                'AtlasesDollAriel',
                'Jk', null, true)
            .layer(0, 0, 'bag',
                'AtlasesDollAriel',
                'Bb', null, true)
            .layer(0, 0, 'head',
                'AtlasesDollAriel',
                'Head', 'Head')
            .layer(0, 0, 'jew_f',
                'AtlasesDollAriel',
                'JF', null, true)
            .layer(0, 0, 'hair',
                'AtlasesDollAriel',
                'H', 'H')
            .layer(0, 0, 'hat',
                'AtlasesDollAriel',
                'Ht', null, true)
            .layer(0, 0, 'hand',
                'AtlasesDollAriel',
                'Hand', 'Hand');
        this.moana = new Doll(this, 544, 5)
            .layer(0, 0, 'hair_b',
                'AtlasesDollMoana',
                'HB', 'HB')
            .layer(0, 0, 'bag_b',
                'AtlasesDollMoana',
                'BbB', null, true)
            .layer(0, 0, 'jack_b',
                'AtlasesDollMoana',
                'JkB', null, true)
            .layer(0, 0, 'top_b',
                'AtlasesDollMoana',
                'TB', null, true)
            .layer(0, 0, 'dress_b',
                'AtlasesDollMoana',
                'DB', null, true)
            .layer(0, 0, 'body',
                'AtlasesDollMoana',
                'Body', 'Body')
            .layer(0, 0, 'und',
                'AtlasesDollMoana',
                'Und', 'Und')
            .layer(0, 0, 'jew_b',
                'AtlasesDollMoana',
                'JB', null, true)
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
            .layer(0, 0, 'bag',
                'AtlasesDollMoana',
                'Bb', null, true)
            .layer(0, 0, 'head',
                'AtlasesDollMoana',
                'Head', 'Head')
            .layer(0, 0, 'jew_f',
                'AtlasesDollMoana',
                'JF', null, true)
            .layer(0, 0, 'hair',
                'AtlasesDollMoana',
                'H', 'H')
            .layer(0, 0, 'hat',
                'AtlasesDollMoana',
                'Ht', null, true)
            .layer(0, 0, 'hand',
                'AtlasesDollMoana',
                'Hand', 'Hand');

        this.girl = this.game.add.sprite(101 - 700, 63,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Gr1);
        this.cloud = this.game.add.sprite(368, 211,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Cl1);

        this.cloud.alpha = 0;
        this.ariel.show(true);
        this.moana.hide(true);
        this.chest.disable();
        this.ariel.getBody().x += 700;

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.moreB = this.gui.addExtraMore(960 - 173, 720 - 173,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE);
            this.g1 = this.game.add.sprite(960 - 178 / 2, 720 - 188 / 2,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MGr1);
            this.g1.anchor.setTo(.5, 1);
            (this.moreB.parent as Phaser.Group).addAt(this.g1, 0);
            this.g2 = this.game.add.sprite(960 - 168 / 2, 720 - 188 / 2,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MGr2);
            this.g2.anchor.setTo(.5, 1);
            (this.moreB.parent as Phaser.Group).addAt(this.g2, 0);
            this.g3 = this.game.add.sprite(960 - 168 / 2, 720 - 188 / 2,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MGr3);
            this.g3.anchor.setTo(.5, 1);
            (this.moreB.parent as Phaser.Group).addAt(this.g3, 0);
            this.g1.scale.setTo(0);
            this.g2.scale.setTo(0);
            this.g3.scale.setTo(0);
            this.g1.alpha = 0;
            this.g2.alpha = 0;
            this.g3.alpha = 0;
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextMore, this);
        }
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        this.beginBtn = this.gui.addExtraBtn(566, 527,
            ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDecor').Frames.GoBtn, () => {
                TweenUtils.fadeAndScaleOut(this.beginBtn);
                TweenUtils.fadeOut(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .5);
                TweenUtils.slideOut(this.girl, 101 - 700, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                TweenUtils.slideIn(this.ariel.getBody(), 506, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
                    this.chest.show();
                    this.chest.enable();
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
        this.currentDoll = this.ariel;

        // Animations goes here
        TweenUtils.slideIn(this.girl, 101, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3);
        TweenUtils.fadeAndScaleIn(this.beginBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 4);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        // ADS
        if (GameConfig.PUB_MODE === PublishMode.NORMAL ||
            GameConfig.PUB_MODE === PublishMode.NO_BUTTONS ||
            GameConfig.PUB_MODE === PublishMode.NO_BUTTONS_ONE_AD ||
            GameConfig.PUB_MODE === PublishMode.DUW) {
            AdUtils.playAds();
        }
    }

    private nextMore() {
        this.moreState++;
        if (this.moreState > 2) {
            this.moreState = 0;
        }
        if (this.moreState === 0) {
            TweenUtils.customFadeAndScaleIn(this.g1, 1, .75, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.fadeAndScaleOut(this.g1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
            }, this);
        }
        if (this.moreState === 1) {
            TweenUtils.customFadeAndScaleIn(this.g2, 1, .75, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.fadeAndScaleOut(this.g2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
            }, this);
        }
        if (this.moreState === 2) {
            TweenUtils.customFadeAndScaleIn(this.g3, 1, .75, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.fadeAndScaleOut(this.g3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
            }, this);
        }
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 5, this.nextMore, this);
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
            this.currentDoll.on('dress_b', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress', 'dress_f'))
                this.chest.onEquiped(name, 'top', 'dress');
            this.currentDoll.on('top_b', index);
            this.currentDoll.on('top_f', index);
            this.currentDoll.on('und', 0);
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress', 'dress_f'))
                this.chest.onEquiped(name, 'bot', 'dress');
            this.currentDoll.on('bot_b', index);
            this.currentDoll.on('bot_f', index);
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
            this.currentDoll.on('jew_f', index);
            this.currentDoll.on('jew_b', index);
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
            this.currentDoll.on('bag_b', index);
            this.currentDoll.on('bag_f', index);
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

        if (this.currentDoll === this.ariel) this.arielDressed = true;
        if (this.currentDoll === this.moana) this.moanaDressed = true;

        if (this.playBtn.alpha === 0 && this.arielDressed && this.moanaDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        if (sprite.name === 'ar_btn' && this.currentDoll === this.ariel) return;
        if (sprite.name === 'mo_btn' && this.currentDoll === this.moana) return;
        if (this.changing) return;
        this.changing = true;
        this.currentDoll.hide();
        if (this.currentDoll === this.ariel) {
            this.currentDoll = this.moana;
            this.chest.findItem('mo_hair').visible = true;
            this.chest.findItem('ar_hair').visible = false;
        } else {
            this.currentDoll = this.ariel;
            this.chest.findItem('mo_hair').visible = false;
            this.chest.findItem('ar_hair').visible = true;
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

        GameConfig.DOLL_1 = this.ariel.extract();
        GameConfig.DOLL_2 = this.moana.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.moveInOut(this.currentDoll.getBody(), this.currentDoll.getBody().x - 170, this.currentDoll.getBody().y, Phaser.Timer.SECOND * 1);
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

