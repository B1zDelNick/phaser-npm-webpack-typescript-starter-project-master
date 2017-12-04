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

    private NEXT = 'Result';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;
    private doll: Doll = null;
    private chest: Chest = null;
    private spinner: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
    private btnContainer: Phaser.Group = null;
    private mmmm: Phaser.Sprite = null;
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

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg5').getName());

        // Chests
        this.chest = new Chest(this, -700)
            .configure({hideSelected: true})
            .background(18, -57,
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Chest)
            .page()
                .item(46, 86, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress1,
                    this.onItem)
                .item(167, 85, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress2,
                    this.onItem)
                .item(262, 86, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress3,
                    this.onItem)
                .item(112, 503, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe1,
                    this.onItem)
                .item(228, 493, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe2,
                    this.onItem)
                .item(340, 493, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe3,
                    this.onItem)
            .build()
            .page()
                .item(86, 86, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress4,
                    this.onItem)
                .item(257, 87, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress6,
                    this.onItem)
                .item(190, 90, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress5,
                    this.onItem)
                .item(114, 500, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe4,
                    this.onItem)
                .item(217, 499, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe5,
                    this.onItem)
                .item(317, 509, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe6,
                    this.onItem)
            .build()
            .page()
                .pageShelf(60, 484,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf)
                .item(62, 77, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jack1,
                    this.onItem)
                .item(188, 84, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jack2,
                    this.onItem)
                .item(331, 81, 'neck1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Neck1,
                    this.onItem)
                .item(126, 336, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew1,
                    this.onItem)
                .item(229, 336, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew2,
                    this.onItem)
                .item(331, 336, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(60, 413,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf)
                .compoundItem(5, 1, -1, 175, 145, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames, 'Hair',
                    this.onItem)
                .item(75, 292, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Glove1,
                    this.onItem)
                .item(265, 494, 'neck3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Neck2,
                    this.onItem)
                .item(106, 475, 'neck2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Neck3,
                    this.onItem)
                .item(352, 353, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Hat1,
                    this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
                .item(105, 105, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Cross,
                    GuiUtils.goCross('http://mycutegames.com/Games/Princess/Princess-High-Fashion-to-Ready-to-Wear.html'),
                    null, null)
                .item(210, 465, 'mmmm_btn',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.PlBtn,
                    GuiUtils.goCross('http://mycutegames.com/Games/Princess/Princess-High-Fashion-to-Ready-to-Wear.html'),
                    GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg)
            .build()
            .leftArrow(18, 402,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(453, 402,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            this.chest.findItem('mmmm').filters = [EffectUtils.makeLightGlowAnimation(0xffff99)];
            EffectUtils.makeScaleAnimation(this.chest.findItem('mmmm_btn'), 1.05, 500);
        }

        // Dolls
        this.doll = new Doll(this, 530, 21)
            .layer(114, 0, 'hat_b',
                'AtlasesDollAvrora',
                'HtN', null, true)
            .layer(76, 95, 'jack_b',
                'AtlasesDollAvrora',
                'JkB', null, true)
            .layer(139, -8, 'hair_b',
                'AtlasesDollAvrora',
                'HB', 'HB')
            .layer(45, 71, 'body',
                'AtlasesDollAvrora',
                'Body', 'Body')
            .layer(143, 17, 'head',
                'AtlasesDollAvrora',
                'Head', 'Head')
            .layer(103, 575, 'shoe',
                'AtlasesDollAvrora',
                'S', null)
            .layer(-5, 110, 'dress',
                'AtlasesDollAvrora',
                'D', null)
            .layer(163, 69, 'jew',
                'AtlasesDollAvrora',
                'J', null, true)
            .layer(48, 256, 'glove',
                'AtlasesDollAvrora',
                'Gl', null, true)
            .layer(76, 98, 'jack',
                'AtlasesDollAvrora',
                'Jk', null, true)
            .layer(99, 97, 'neck',
                'AtlasesDollAvrora',
                'Nk', null, true)
            .layer(123, 104, 'rib',
                'AtlasesDollAvrora',
                'Rb', null, true)
            .layer(125, 3, 'hair',
                'AtlasesDollAvrora',
                'H', 'H')
            .layer(114, 0, 'hat',
                'AtlasesDollAvrora',
                'Ht', null, true);

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(835, 520,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE11919931').getName(),
                null, 10, true);
        }
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

        // Initalizations

        // Animations goes here
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.chest.show, this.chest);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress2State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.doll.on('dress', index, 'top', 'bot', 'und'))
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
            this.doll.on('jew_f', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('hat', index);
            this.doll.on('hat_b', index);
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('acs', index, 'bag');
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('bag', index, 'acs');
            this.doll.on('bag_b', index);
            // this.doll.on('bag_f', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.doll.on('glove', index);
        }
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.doll.on('glass', index);
        }
        else if (name.indexOf('neck') !== -1) {
            index = parseInt(name.substr(4));
            this.doll.on('neck', index);
            this.doll.on('neck_b', index);
        }
        else if (name.indexOf('jack') !== -1) {
            index = parseInt(name.substr(4));
            this.doll.on('jack', index);
            this.doll.on('jack_b', index);
        }
        else if (name.indexOf('belt') !== -1) {
            index = parseInt(name.substr(4));
            this.doll.on('belt', index);
            this.doll.on('belt_b', index);
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

        if (this.bg) this.bg.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);
        if (this.mmmm) this.mmmm.destroy(true);

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
        TweenUtils.moveInOut(this.doll.getBody(), this.doll.getBody().x - 200, this.doll.getBody().y, 2000);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2.5, () => {
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

