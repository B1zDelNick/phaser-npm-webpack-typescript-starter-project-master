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

export default class Dress extends Phaser.State {

    private NEXT = 'Final';
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

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        // Chests
        this.chest = new Chest(this, 0)
            .configure({hideSelected: true})
            .page()
                .item(438, 273, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Top1,
                    this.onItem)
                .item(528, 273, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Top2,
                    this.onItem)
                .item(615, 273, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Top3,
                    this.onItem)
                .item(713, 276, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Top4,
                    this.onItem)
                .item(524, 571, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe1,
                    this.onItem)
                .item(622, 604, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe2,
                    this.onItem)
                .item(702, 449, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe3,
                    this.onItem)
                .item(743, 182, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Acs1,
                    this.onItem)
                .item(800, 116, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Glove1,
                    this.onItem)
                .item(635, 76, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Hat1,
                    this.onItem)
            .build()
            .page()
                .item(518, 279, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Bot1,
                    this.onItem)
                .item(601, 271, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Bot2,
                    this.onItem)
                .item(691, 274, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Bot3,
                    this.onItem)
                .item(790, 277, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Bot4,
                    this.onItem)
                .item(524, 571, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe1,
                    this.onItem)
                .item(622, 604, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe2,
                    this.onItem)
                .item(702, 449, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe3,
                    this.onItem)
                .item(743, 182, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Acs1,
                    this.onItem)
                .item(800, 116, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Glove1,
                    this.onItem)
                .item(635, 76, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Hat1,
                    this.onItem)
            .build()
            .page()
                .item(448, 271, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Top5,
                    this.onItem)
                .item(538, 275, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Top6,
                    this.onItem)
                .item(626, 273, 'top7',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Top7,
                    this.onItem)
                .item(727, 286, 'top8',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Top8,
                    this.onItem)
                .item(534, 578, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe4,
                    this.onItem)
                .item(627, 578, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe5,
                    this.onItem)
                .item(711, 569, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe6,
                    this.onItem)
                .item(754, 108, 'sock1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Sock1,
                    this.onItem)
                .item(635, 76, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Hat2,
                    this.onItem)
            .build()
            .page()
                .item(511, 277, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Bot5,
                    this.onItem)
                .item(600, 277, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Bot6,
                    this.onItem)
                .item(691, 277, 'bot7',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Bot7,
                    this.onItem)
                .item(761, 275, 'bot8',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Bot8,
                    this.onItem)
                .item(534, 578, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe4,
                    this.onItem)
                .item(627, 578, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe5,
                    this.onItem)
                .item(711, 569, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Shoe6,
                    this.onItem)
                .item(754, 108, 'sock1',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Sock1,
                    this.onItem)
                .item(635, 76, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Hat2,
                    this.onItem)
            .build()
            .static()
                .compoundItem(6, 1, -1, 525, 43, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames, 'Hair',
                    this.onItem)
                /*.compoundItem(2, 1, -1, 635, 76, 'hat',
                    ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress').Frames, 'Hat',
                    this.onItem)*/
            .build()
            .leftArrow(468, 270,
                ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Rb)
            .rightArrow(880, 270,
                ImageUtils.getAtlasClass('AtlasesStateDress').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress').Frames.Lb)
            .build();

        // Dolls
        this.doll = new Doll(this, 172, 49)
            .layer(98, -15, 'hat_b',
                'AtlasesDollAvrora',
                'HtB', null, true)
            .layer(94, 0, 'hair_b',
                'AtlasesDollAvrora',
                'HB', 'HB')
            .layer(0, 0, 'body',
                'AtlasesDollAvrora',
                'Body', 'Body')
            .layer(104, 141, 'und',
                'AtlasesDollAvrora',
                'Und', 'Und')
            .layer(96, 101, 'dress',
                'AtlasesDollAvrora',
                'D', 'D')
            .layer(11, 130, 'glove',
                'AtlasesDollAvrora',
                'Gl', null, true)
            .layer(111, 332, 'sock',
                'AtlasesDollAvrora',
                'Sk', null, true)
            .layer(-23, 282, 'acs',
                'AtlasesDollAvrora',
                'Ac', null, true)
            .layer(120, 374, 'shoe',
                'AtlasesDollAvrora',
                'S', 'S')
            .layer(74, 208, 'bot',
                'AtlasesDollAvrora',
                'B', null)
            .layer(34, 94, 'top',
                'AtlasesDollAvrora',
                'T', null)
            .layer(75, -54, 'hair',
                'AtlasesDollAvrora',
                'H', 'H')
            .layer(127, -16, 'hat',
                'AtlasesDollAvrora',
                'Ht', null, true)
            .layer(9, 307, 'hand',
                'AtlasesDollAvrora',
                'Hand', 'Hand');

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(759, 570,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE2121565').getName(),
                [0, 1, 2, 3, 4, 5], 8, true);
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
        // TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.chest.show, this.chest);

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
        else if (name.indexOf('sock') !== -1) {
            index = parseInt(name.substr(4));
            this.doll.on('sock', index, 'bag');
            this.doll.on('sock_b', index, 'bag');
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
        GameConfig.DOLL_1 = this.doll.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.CURRENT_STATE++;
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.moveInOut(this.doll.getBody(), this.doll.getBody().x, this.doll.getBody().y, 2000);
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

