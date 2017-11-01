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

    private NEXT = 'Select';
    private nextPrepared = false;
    private changing = false;

    private currentDoll: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private ariel: Doll = null;
    private cindy: Doll = null;
    private chest: Chest = null;
    private bg: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private container: Phaser.Group = null;
    private mmmm: Phaser.Button = null;

    private arBtn: Phaser.Button = null;
    private ciBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;

    private arielDressed: boolean = false;
    private cindyDressed: boolean = false;

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
        this.cindy = null;
        this.changing = false;
        this.arielDressed = false;
        this.cindyDressed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg2').getName());

        this.container = this.game.add.group();
        this.mmmm = GuiUtils.makeButton(
            this, this.container, 807, 380, 1,
            'mmmm', ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Mmmm,
            GameConfig.PUB_MODE === PublishMode.NORMAL, true, GameConfig.PUB_MODE === PublishMode.NORMAL,
            GuiUtils.goLinkInMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler
        );

        // Chests
        this.chest = new Chest(this, 750)
            .background(261, 38,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Chest)
            .page()
                .item(512, 454, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat1,
                    this.onItem)
                .item(660, 269, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew1,
                    this.onItem)
                .item(507, 269, 'jew9',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew9,
                    this.onItem)
                .item(665, 68, 'jew6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew6,
                    this.onItem)
                .item(515, 71, 'jew7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew7,
                    this.onItem)
                .item(364, 71, 'jew8',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew8,
                    this.onItem)
                .item(360, 484, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Glass1,
                    this.onItem)
                .item(368, 551, 'bag3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag3,
                    this.onItem)
                .item(660, 535, 'bag5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag5,
                    this.onItem)
                .item(360, 250, 'hat3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat3,
                    this.onItem)
            .build()
            .page()
                .item(378, 555, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag2,
                    this.onItem)
                .item(370, 448, 'bag6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag6,
                    this.onItem)
                .item(506, 457, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Acs1,
                    this.onItem)
                .item(659, 75, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew2,
                    this.onItem)
                .item(516, 79, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew3,
                    this.onItem)
                .item(497, 255, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat2,
                    this.onItem)
                .item(359, 70, 'jew5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew5,
                    this.onItem)
                .item(365, 262, 'jew4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew4,
                    this.onItem)
                .item(666, 468, 'acs2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Acs2,
                    this.onItem)
                .item(674, 309, 'bag4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag4,
                    this.onItem)
            .build()
            .leftArrow(483, 0,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(589, 0,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        // Dolls
        this.ariel = GameConfig.DOLL_1.insert();
        this.cindy = GameConfig.DOLL_2.insert();
        this.ariel.setPosition(10, 64);
        this.cindy.setPosition(-6, 60);

        this.ariel.show(true);
        this.cindy.hide(true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        const moreBtn = this.gui.addExtraMore(
            960 - 124, 720 - 200,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
            GuiUtils.addOverGlowHandler,
            GuiUtils.addOutGlowHandler
        );
        EffectUtils.makeLightRotateAnimation(moreBtn, Phaser.Timer.SECOND * .8);
        this.arBtn = this.gui.addExtraBtn(2, 401,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBtn,
            this.changeDoll
        );
        this.ciBtn = this.gui.addExtraBtn(2, 401,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.CinBtn,
            this.changeDoll
        );
        this.arBtn.scale.setTo(0);
        this.arBtn.alpha = 0;
        this.ciBtn.scale.setTo(0);
        this.ciBtn.alpha = 0;

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
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, () => {
            this.chest.show();
            TweenUtils.fadeAndScaleIn(this.ciBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentDoll.on('dress', index, 'top', 'bot'))
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            // this.currentDoll.on('dress_b', index);
            // this.currentDoll.on('dress_f', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress'))
                this.chest.onEquiped(name, 'top', 'dress');
            this.currentDoll.on('top_b', index);
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress'))
                this.chest.onEquiped(name, 'bot', 'dress');
            this.currentDoll.on('bot_b', index);
            this.currentDoll.on('bot_f', index);
            this.currentDoll.on('bot_t', index);
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.chest.onEquiped(name, 'shoe');
            this.currentDoll.on('shoe_f', index);
        }
        else if (name.indexOf('jew') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('jew', index);
            this.currentDoll.on('jew_b', index);
            this.currentDoll.on('jew_f', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('hat', index);
            this.currentDoll.on('hat_b', index);
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('acs', index);
            this.currentDoll.on('acs_f', index);
            this.currentDoll.on('acs_b', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('bag', index);
            this.currentDoll.on('bag_b', index);
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
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('hair', index)) {
                // this.chest.onEquiped(name, 'hair');
            }
            this.currentDoll.on('hair_b', index);
        }

        if (this.currentDoll === this.ariel) this.arielDressed = true;
        if (this.currentDoll === this.cindy) this.cindyDressed = true;

        if (this.playBtn.alpha === 0 && this.arielDressed && this.cindyDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        if (sprite === this.arBtn && this.currentDoll === this.ariel) return;
        if (sprite === this.ciBtn && this.currentDoll === this.cindy) return;
        if (this.changing) return;
        this.changing = true;
        this.currentDoll.hide();
        if (this.currentDoll === this.ariel) {
            this.currentDoll = this.cindy;
            TweenUtils.fadeAndScaleOut(this.ciBtn, Phaser.Timer.SECOND * .75);
            TweenUtils.fadeAndScaleIn(this.arBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        } else {
            this.currentDoll = this.ariel;
            TweenUtils.fadeAndScaleOut(this.arBtn, Phaser.Timer.SECOND * .75);
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

        this.currentDoll = null;

        this.chest.dispose();

        if (this.bg) this.bg.destroy(true);
        if (this.container) this.container.destroy(true);
        if (this.mmmm) this.mmmm.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1 = this.ariel.extract();
        GameConfig.DOLL_2 = this.cindy.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        if (GameConfig.CURRENT_STATE === 1) GameConfig.CURRENT_STATE++;
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.move(this.currentDoll.getBody(), this.currentDoll.getBody().x + 300, this.currentDoll.getBody().y, Phaser.Timer.SECOND * 1);
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

