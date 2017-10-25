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
import {isNull, isUndefined} from 'util';
import {AdUtils} from '../utils/ad/ad.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {SoundUtils} from '../utils/sound/sound.utils';

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
            /*.background(365, 0,
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Chest)*/
            .page()
                .item(201, 76, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress2,
                    this.onItem)
                .item(118, 76, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress4,
                    this.onItem)
                .item(37, 78, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress5,
                    this.onItem)
                .item(33, 81, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress1,
                    this.onItem)
                .item(-8, 80, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress7,
                    this.onItem)
            .build()
            .page()
                .item(274, 79, 'dress10',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress10,
                    this.onItem)
                .item(180, 77, 'dress9',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress9,
                    this.onItem)
                .item(121, 79, 'dress8',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress8,
                    this.onItem)
                .item(51, 79, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress6,
                    this.onItem)
                .item(-8, 83, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress3,
                    this.onItem)
            .build()
            .static()
                .item(839, 91, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bag1,
                    this.onItem)
                .item(833, 168, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bag2,
                    this.onItem)
                .compoundItem(6, 1, -1, 732, 71, 'jew',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames, 'Jew',
                    this.onItem)
                .compoundItem(6, 2, -1, 736, 207, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames, 'Hair',
                    this.onItem)
            .build()
            .leftArrow(413, 162,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(413, 71,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        // Dolls
        this.doll = new Doll(this, 446, 38)
            .layer(0, 0, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollCindyHairB').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindyHairB').Frames,
                'HB', 'HB1')
            .layer(0, 0, 'dress_b',
                ImageUtils.getAtlasClass('AtlasesDollCindyDressBF').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindyDressBF').Frames,
                'DB', null)
            .layer(0, 0, 'body',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                null, 'Body')
            .layer(0, 0, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollCindyDress').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindyDress').Frames,
                'D', null)
            .layer(0, 0, 'und',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                null, 'D')
            .layer(0, 0, 'jew_b',
                ImageUtils.getAtlasClass('AtlasesDollCindyJewB').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindyJewB').Frames,
                'JB', null, true)
            .layer(0, 0, 'head',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                null, 'Head')
            .layer(0, 0, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollCindyJew').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindyJew').Frames,
                'J', null, true)
            .layer(0, 0, 'bag',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                'Bb', null, true)
            .layer(0, 0, 'hand',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                null, 'Hand')
            .layer(0, 0, 'dress_f',
                ImageUtils.getAtlasClass('AtlasesDollCindyDressBF').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindyDressBF').Frames,
                'DF', null)
            .layer(0, 0, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollCindyHair').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindyHair').Frames,
                'H', 'H1');

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 191, 720 - 202,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
            GuiUtils.addOverGlowHandler,
            GuiUtils.addOutGlowHandler
        );
        const mmmm = this.gui.addExtraBtnAnimated(
            195, 560,
            ImageUtils.getSpritesheetClass('SpritesheetsMmmm2401704').getName(), 8, true,
            GuiUtils.goLinkInMoreGames
        );
        mmmm.visible = GameConfig.PUB_MODE === PublishMode.NORMAL;
        EffectUtils.makeScaleAnimation(moreBtn, 1.05, Phaser.Timer.SECOND * .5);
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
            PreloaderUtils.preloadDress2State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        /*if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            AdUtils.playAds();
        }*/
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.doll.on('dress', index, 'top', 'bot', 'und'))
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            this.doll.on('dress_b', index);
            this.doll.on('dress_f', index);
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
            this.doll.on('jew_f', index);
            // this.doll.on('jew_f', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('hat', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('bag', index);
            // this.doll.on('bag_b', index);
            // this.doll.on('bag_f', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.doll.on('glove', index);
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

        this.chest.dispose();

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
        GameConfig.CURRENT_STATE++;
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

