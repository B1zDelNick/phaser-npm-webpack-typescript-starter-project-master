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

export default class Dress2 extends Phaser.State {

    private NEXT = 'Select';
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

        SoundUtils.play('valz');
    }

    public preload(): void {
    }

    public create(): void {
        this.bg = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
            ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Bg4);

        // Chests
        this.chest = new Chest(this)
            .configure({})
            .background(32, 27,
                ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Chest)
            .page()
                .pageShelf(81, 105,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(73, 95, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Dress2,
                    this.onItem)
                .item(76, 90, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Dress1,
                    this.onItem)
            .build()
            .page()
                .pageShelf(81, 105,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(73, 95, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Dress4,
                    this.onItem)
                .item(75, 90, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Dress3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(81, 105,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(87, 96, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Dress6,
                    this.onItem)
                .item(75, 94, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Dress5,
                    this.onItem)
            .build()
            .page()
                .pageShelf(81, 105,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf1)
                .item(55, 95, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Dress7,
                    this.onItem)
            .build()
            .page()
                .pageShelf(81, 278,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf2)
                .item(88, 117, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Hair1,
                    this.onItem)
                .item(218, 78, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Hair2,
                    this.onItem)
                .item(72, 352, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Hair3,
                    this.onItem)
                .item(161, 330, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Hair4,
                    this.onItem)
                .item(239, 340, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Hair5,
                    this.onItem)
            .build()
            .page()
                .pageShelf(81, 203,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf3)
                .item(79, 389, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Jew1,
                    this.onItem)
                .item(175, 386, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Jew2,
                    this.onItem)
                .item(263, 384, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Jew3,
                    this.onItem)
                .item(83, 152, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Hat1,
                    this.onItem)
                .item(244, 144, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Hat2,
                    this.onItem)
                .item(88, 263, 'hat3',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Hat3,
                    this.onItem)
                .item(246, 269, 'hat4',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Hat4,
                    this.onItem)
            .build()
            .page()
                .pageShelf(81, 191,
                    ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Shelf4)
                .item(135, 109, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Shoe1,
                    this.onItem)
                .item(226, 128, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Shoe2,
                    this.onItem)
                .item(139, 251, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Shoe3,
                    this.onItem)
                .item(239, 269, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Shoe4,
                    this.onItem)
                .item(143, 411, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Shoe5,
                    this.onItem)
                .item(237, 394, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Shoe6,
                    this.onItem)
                .item(143, 559, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Shoe7,
                    this.onItem)
                .item(238, 533, 'shoe8',
                    ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress2State').Frames.Shoe8,
                    this.onItem)
            .build()
            .category('dresses', true, 0, 3, 390, 128,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.DressBtn)
            .category('hairs', false, 4, 4, 390, 220,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.HairBtn)
            .category('jews', false, 5, 5, 390, 315,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.JewBtn)
            .category('shoes', false, 6, 6, 390, 408,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.ShoeBtn)
            .categoryLeftArrow(92, 547,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Lb)
            .categoryRightArrow(290, 547,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Rb)
            .button(390, 501, 'mmmm',
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.MmmmBtn,
                GuiUtils.goLinkInMoreGames)
            .build();

        // Dolls
        this.doll = new Doll(this, 469, 46)
            .layer(196, -34, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                'HB', 'HB')
            .layer(56, 11, 'body',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                null, 'Body')
            .layer(96, 510, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                'S', null)
            .layer(-3, 94, 'dress',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                'D', null)
            .layer(215, 53, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                'J', null, true)
            .layer(184, -12, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                'H', 'H')
            .layer(187, -28, 'hat',
                ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollCindy').Frames,
                'Ht', null, true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.gui.addExtraMoreAnimated(
            960 - 125, 720 - 199,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE11919931').getName(),
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );
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
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.chest.show, this.chest);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
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
            if (this.doll.on('dress', index, 'top', 'bot'))
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
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
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('hat', index);
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

    private nextPage(): void {
        this.chest.nextPage();
    }

    private prevPage(): void {
        this.chest.prevPage();
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
        this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_2 = this.doll.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.CURRENT_STATE++;
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

