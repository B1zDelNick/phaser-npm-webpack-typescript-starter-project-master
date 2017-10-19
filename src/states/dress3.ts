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
import {TweenUtils} from '../utils/tween.utils';
import {Chest} from './template/dress/chest';
import {Doll} from './template/dress/doll';
import {AdUtils} from '../utils/ad/ad.utils';
import {ImageUtils} from '../utils/images/image.utils';

export default class Dress3 extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;
    private doll: Doll = null;
    private chest: Chest = null;
    private spinner: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private playBtn: Phaser.Button = null;

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
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName());

        // Chests
        this.chest = new Chest(this, 0)
            .configure({hideSelected: true})
            .page()
                .item(345, 47, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress1,
                    this.onItem)
                .item(219, 45, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress2,
                    this.onItem)
                .item(228, 47, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress3,
                    this.onItem)
                .item(140, 43, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress4,
                    this.onItem)
                .item(113, 404, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.BagMore,
                    GuiUtils.goLinkInMoreGames)
                .item(215, 482, 'bag3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bag3,
                    this.onItem)
                .item(287, 476, 'bag5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bag5,
                    this.onItem)
                .item(382, 462, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bag2,
                    this.onItem)
                .item(393, 519, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Hat1,
                    this.onItem)
            .build()
            .page()
                .item(283, 41, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress7,
                    this.onItem)
                .item(255, 42, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress5,
                    this.onItem)
                .item(197, 48, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress6,
                    this.onItem)
                .item(138, 48, 'dress8',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress8,
                    this.onItem)
                .item(139, 459, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew1,
                    this.onItem)
                .item(212, 470, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew2,
                    this.onItem)
                .item(278, 477, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew3,
                    this.onItem)
                .item(354, 488, 'jew4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew4,
                    this.onItem)
                .item(429, 498, 'jew5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew5,
                    this.onItem)
            .build()
            .background(0, 468,
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Chest)
            .static()
                .item(566, 596, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe1,
                    this.onItem)
                .item(286, 556, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe2,
                    this.onItem)
                .item(410, 570, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe3,
                    this.onItem)
                .item(566, 452, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe4,
                    this.onItem)
                .item(852, 478, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe5,
                    this.onItem)
                .item(130, 519, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe6,
                    this.onItem)
                .item(484, 545, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bag1,
                    this.onItem)
                .item(53, 519, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Glass1,
                    this.onItem)
                .item(630, 562, 'bag4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bag4,
                    this.onItem)
                .item(185, 615, 'neck1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Neck1,
                    this.onItem)
            .build()
            .leftArrow(69, 136,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(536, 136,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        // Dolls
        this.doll = new Doll(this, 503, 6)
            .layer(0, 0, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRap').Frames,
                'HB', 'HB')
            .layer(0, 0, 'neck_b',
                ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRap').Frames,
                'NkB', null, true)
            .layer(0, 0, 'bag_b',
                ImageUtils.getAtlasClass('AtlasesDollRapBagsDressesF').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRapBagsDressesF').Frames,
                'BbB', null, true)
            .layer(0, 0, 'hat_b',
                ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRap').Frames,
                'HtB', null, true)
            .layer(0, 0, 'dress_b',
                ImageUtils.getAtlasClass('AtlasesDollRapDresses').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRapDresses').Frames,
                'DB', null)
            .layer(0, 0, 'jew_b',
                ImageUtils.getAtlasClass('AtlasesDollRapJews').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRapJews').Frames,
                'JB', null, true)
            .layer(0, 0, 'body',
                ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRap').Frames,
                null, 'Body')
            .layer(0, 0, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollRapShoes').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRapShoes').Frames,
                'S', 'S')
            .layer(0, 0, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollRapDresses').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRapDresses').Frames,
                'D', 'D')
            .layer(0, 0, 'jew_m',
                ImageUtils.getAtlasClass('AtlasesDollRapJewsM').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRapJewsM').Frames,
                'JM', null, true)
            .layer(0, 0, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRap').Frames,
                'H', 'H')
            .layer(0, 0, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollRapJews').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRapJews').Frames,
                'J', null, true)
            .layer(0, 0, 'hand',
                ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRap').Frames,
                null, 'Hand')
            .layer(0, 0, 'dress_f',
                ImageUtils.getAtlasClass('AtlasesDollRapBagsDressesF').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRapBagsDressesF').Frames,
                'DF', null)
            .layer(0, 0, 'bag',
                ImageUtils.getAtlasClass('AtlasesDollRapBagsDressesF').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRapBagsDressesF').Frames,
                'Bb', null, true)
            .layer(0, 0, 'hat',
                ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRap').Frames,
                'Ht', null, true)
            .layer(0, 0, 'glass',
                ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRap').Frames,
                'Gs', null, true)
            .layer(0, 0, 'neck',
                ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
                ImageUtils.getAtlasClass('AtlasesDollRap').Frames,
                'Nk', null, true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 183, 720 - 132,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        EffectUtils.makeLightRotateAnimation(moreBtn);
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

        // Initalizations

        // Animations goes here

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadFinalState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            AdUtils.playAds();
        }
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.doll.on('dress', index, 'top', 'bot'))
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            this.doll.on('dress_b', index);
            if (this.playBtn.alpha === 0) {
                TweenUtils.fadeAndScaleIn(this.playBtn);
            }
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.doll.on('top', index, 'dress'))
                this.chest.onEquiped(name, 'top', 'dress');
            if (this.playBtn.alpha === 0) {
                TweenUtils.fadeAndScaleIn(this.playBtn);
            }
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.doll.on('bot', index, 'dress'))
                this.chest.onEquiped(name, 'bot', 'dress');
            if (this.playBtn.alpha === 0) {
                TweenUtils.fadeAndScaleIn(this.playBtn);
            }
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.doll.on('shoe', index))
                this.chest.onEquiped(name, 'shoe');
        }
        else if (name.indexOf('jew') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('jew', index);
            this.doll.on('jew_b', index);
            this.doll.on('jew_m', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('hat', index);
            this.doll.on('hat_b', index);
        }
        else if (name.indexOf('neck') !== -1) {
            index = parseInt(name.substr(4));
            this.doll.on('neck', index);
            this.doll.on('neck_b', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('bag', index);
            this.doll.on('bag_b', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.doll.on('glove', index);
        }
        else if (name.indexOf('brace') !== -1) {
            index = parseInt(name.substr(5));
            this.doll.on('brace', index);
        }
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.doll.on('glass', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(4));
            if (this.doll.on('hair', index))
                this.chest.onEquiped(name, 'hair');
            this.doll.on('hair_b', index);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.chest.disable();

        this.bg.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_3 = this.doll.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.chest.disable();
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

