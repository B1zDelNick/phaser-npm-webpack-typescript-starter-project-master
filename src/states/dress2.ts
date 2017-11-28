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

    private NEXT = 'Place';
    private nextPrepared = false;
    private changing = false;

    private currentGirl: Doll = null;
    private currentBoy: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private ariel: Doll = null;
    private eric: Doll = null;
    private avrora: Doll = null;
    private charm: Doll = null;
    private chest: Chest = null;
    private bg: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private arBtn: Phaser.Button = null;
    private avBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;

    private arielDressed: boolean = false;
    private avroraDressed: boolean = false;
    private charmDressed: boolean = false;
    private ericDressed: boolean = false;

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
        this.avrora = null;
        this.changing = false;
        this.arielDressed = false;
        this.avroraDressed = false;
        this.charmDressed = false;
        this.ericDressed = false;
        this.currentBoy = null;
        this.currentGirl = null;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        // Dolls
        this.charm = GameConfig.DOLL_3.insert();
        this.avrora = GameConfig.DOLL_1.insert();
        this.ariel = GameConfig.DOLL_2.insert();
        this.eric = GameConfig.DOLL_4.insert();
        this.charm.setPosition(85, 62);
        this.avrora.setPosition(13, 94);
        this.ariel.setPosition(12, 90);
        this.eric.setPosition(52, 93);

        // Chests
        this.chest = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(480, 66,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Chest)
            .page()
                .pageShelf(498, 186,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf1)
                .item(552, 118, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat1,
                    this.onItem)
                .item(661, 124, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat2,
                    this.onItem)
                .item(783, 115, 'hat3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat3,
                    this.onItem)
                .item(509, 257, 'hat4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat4,
                    this.onItem)
                .item(637, 247, 'hat5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat5,
                    this.onItem)
                .item(757, 252, 'hat6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat6,
                    this.onItem)
                .item(850, 251, 'hat7',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat7,
                    this.onItem)
                .item(536, 365, 'hat8',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat8,
                    this.onItem)
                .item(656, 373, 'hat9',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hat9,
                    this.onItem)
                .item(780, 404, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Glass1,
                    this.onItem)
                .item(790, 512, 'glass2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Glass2,
                    this.onItem)
                .item(518, 519, 'neck1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Neck1,
                    this.onItem)
                .item(648, 524, 'neck2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Neck2,
                    this.onItem)
            .build()
            .page()
                .pageShelf(498, 186,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf2)
                .item(537, 99, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew1,
                    this.onItem)
                .item(663, 98, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew2,
                    this.onItem)
                .item(791, 99, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew3,
                    this.onItem)
                .item(510, 269, 'brace1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Brace1,
                    this.onItem)
                .item(580, 281, 'brace2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Brace2,
                    this.onItem)
                .item(676, 287, 'brace3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Brace3,
                    this.onItem)
                .item(498, 366, 'sock1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Sock1,
                    this.onItem)
                .item(668, 447, 'sock2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Sock2,
                    this.onItem)
                .item(669, 372, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Acs1,
                    this.onItem)
                .item(768, 251, 'lif2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Lif1,
                    this.onItem)
                .item(772, 422, 'lif1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Lif2,
                    this.onItem)
                .build()
            .page()
                .pageShelf(498, 207,
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shelf3)
                .item(528, 144, 'b_hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.PrHat1,
                    this.onItem)
                .item(658, 144, 'b_hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.PrHat2,
                    this.onItem)
                .item(795, 151, 'b_hat3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.PrHat3,
                    this.onItem)
                .item(523, 314, 'b_hat4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.PrHat4,
                    this.onItem)
                .item(677, 314, 'b_hat5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.PrHat5,
                    this.onItem)
                .item(783, 331, 'b_glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.PrGlass1,
                    this.onItem)
                .item(518, 465, 'b_jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.PrJew1,
                    this.onItem)
                .item(645, 465, 'b_jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.PrJew2,
                    this.onItem)
                .item(795, 440, 'b_neck1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.PrNeck1,
                    this.onItem)
            .build()
            .leftArrow(421, 223,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(421, 325,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        /*if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            EffectUtils.makeScaleAnimation(this.chestOne.findItem('mmmm_btn'), 1.05, 500);
            EffectUtils.makeScaleAnimation(this.chestTwo.findItem('mmmm_btn'), 1.05, 500);
        }*/

        this.avrora.show(true);
        this.charm.show(true);
        this.ariel.hide(true);
        this.eric.hide(true);

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW, true);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(
                960 - 157, 720 - 157,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621624').getName(), 5, true,
                GuiUtils.addOverHandler,
                GuiUtils.addOutHandler
            );
        }
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        this.arBtn = this.gui.addExtraBtn(382, 471,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBtn,
            this.changeDoll
        );
        this.avBtn = this.gui.addExtraBtn(382, 471,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBtn,
            this.changeDoll
        );
        this.arBtn.scale.setTo(0);
        this.arBtn.alpha = 0;
        this.avBtn.scale.setTo(0);
        this.avBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply

        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Initalizations
        this.currentGirl = this.avrora;
        this.currentBoy = this.charm;

        // Animations goes here
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.chest.show, this.chest);
        TweenUtils.fadeAndScaleIn(this.arBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadPlaceState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        if (GameConfig.PUB_MODE === PublishMode.NORMAL ||
            GameConfig.PUB_MODE === PublishMode.NO_BUTTONS ||
            GameConfig.PUB_MODE === PublishMode.DUW) {
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, AdUtils.playAds, this);
        }
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentGirl.on('dress', index, 'top', 'bot'))
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            // this.currentPair.on('dress_b', index);
            // this.currentPair.on('dress_f', index);
        }
        else if (name.indexOf('b_top') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentBoy.on('top', index, 'dress'))
                this.chest.onEquiped(name, 'b_top', 'b_dress');
            if (this.currentBoy === this.charm) this.charmDressed = true;
            if (this.currentBoy === this.eric) this.ericDressed = true;
        }
        else if (name.indexOf('b_bot') !== -1) {
            console.log(name);
            index = parseInt(name.substr(5));
            if (this.currentBoy.on('bot', index, 'dress'))
                this.chest.onEquiped(name, 'b_bot', 'b_dress');
            if (this.currentBoy === this.charm) this.charmDressed = true;
            if (this.currentBoy === this.eric) this.ericDressed = true;
        }
        else if (name.indexOf('b_shoe') !== -1) {
            index = parseInt(name.substr(6));
            if (this.currentBoy.on('shoe', index))
                this.chest.onEquiped(name, 'b_shoe');
        }
        else if (name.indexOf('b_jack') !== -1) {
            index = parseInt(name.substr(6));
            this.currentBoy.on('jack', index);
        }
        else if (name.indexOf('b_hair') !== -1) {
            index = parseInt(name.substr(6));
            if (this.currentBoy.on('hair', index)) {
                this.chest.onEquiped(name, 'b_hair');
            }
        }
        else if (name.indexOf('b_neck') !== -1) {
            index = parseInt(name.substr(6));
            this.currentBoy.on('neck', index);
        }
        else if (name.indexOf('b_jew') !== -1) {
            index = parseInt(name.substr(5));
            this.currentBoy.on('jew', index);
        }
        else if (name.indexOf('b_glass') !== -1) {
            index = parseInt(name.substr(7));
            this.currentBoy.on('glass', index);
        }
        else if (name.indexOf('b_hat') !== -1) {
            index = parseInt(name.substr(5));
            this.currentBoy.on('hat', index);
            // this.currentGirl.on('hat_b', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentGirl.on('top', index, 'dress'))
                this.chest.onEquiped(name, 'top', 'dress');
            if (this.currentGirl === this.ariel) this.arielDressed = true;
            if (this.currentGirl === this.avrora) this.avroraDressed = true;
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentGirl.on('bot', index, 'dress'))
                this.chest.onEquiped(name, 'bot', 'dress');
            if (this.currentGirl === this.ariel) this.arielDressed = true;
            if (this.currentGirl === this.avrora) this.avroraDressed = true;
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentGirl.on('shoe', index))
                this.chest.onEquiped(name, 'shoe');
        }
        else if (name.indexOf('jew') !== -1) {
            index = parseInt(name.substr(3));
            this.currentGirl.on('jew', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.currentGirl.on('hat', index);
            // this.currentGirl.on('hat_b', index);
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.currentGirl.on('acs', index);
        }
        else if (name.indexOf('lif') !== -1) {
            index = parseInt(name.substr(3));
            this.currentGirl.on('lif', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.currentGirl.on('bag', index);
            // this.currentPair.on('bag_b', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.currentGirl.on('glove', index);
        }
        else if (name.indexOf('sock') !== -1) {
            index = parseInt(name.substr(4));
            this.currentGirl.on('sock', index);
        }
        else if (name.indexOf('neck') !== -1) {
            index = parseInt(name.substr(4));
            this.currentGirl.on('neck', index);
        }
        else if (name.indexOf('jack') !== -1) {
            index = parseInt(name.substr(4));
            this.currentGirl.on('jack', index);
        }
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.currentGirl.on('glass', index);
        }
        else if (name.indexOf('brace') !== -1) {
            index = parseInt(name.substr(5));
            this.currentGirl.on('brace', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentGirl.on('hair', index)) {
                this.chest.onEquiped(name, 'hair');
            }
            this.currentGirl.on('hair_b', index);
        }
        if (this.currentGirl === this.ariel) this.arielDressed = true;
        if (this.currentGirl === this.avrora) this.avroraDressed = true;
        if (this.playBtn.alpha === 0 && this.arielDressed && this.avroraDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        if (sprite === this.arBtn && this.currentGirl === this.ariel) return;
        if (sprite === this.avBtn && this.currentGirl === this.avrora) return;
        if (this.changing) return;
        this.changing = true;
        this.currentGirl.hide();
        this.currentBoy.hide();
        this.chest.disable();
        if (this.currentGirl === this.ariel) {
            TweenUtils.fadeAndScaleOut(this.avBtn, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0);
            TweenUtils.fadeAndScaleIn(this.arBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.5);
            this.currentGirl = this.avrora;
            this.currentBoy = this.charm;
        } else {
            TweenUtils.fadeAndScaleOut(this.arBtn, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0);
            TweenUtils.fadeAndScaleIn(this.avBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.5);
            this.currentGirl = this.ariel;
            this.currentBoy = this.eric;
        }
        this.game.time.events.add(Phaser.Timer.SECOND *  .5, () => {
            this.currentGirl.show();
            this.currentBoy.show();
            this.chest.enable();
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

        this.currentGirl = null;
        this.currentBoy = null;

        this.chest.dispose();

        if (this.bg) this.bg.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_2 = this.ariel.extract();
        GameConfig.DOLL_1 = this.avrora.extract();
        GameConfig.DOLL_3 = this.charm.extract();
        GameConfig.DOLL_4 = this.eric.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.fadeAndScaleOut(this.arBtn);
        TweenUtils.fadeAndScaleOut(this.avBtn);
        TweenUtils.move(
            this.currentGirl.getBody(),
            this.currentGirl.getBody().x + 200,
            this.currentGirl.getBody().y,
            Phaser.Timer.SECOND * 1);
        TweenUtils.move(
            this.currentBoy.getBody(),
            this.currentBoy.getBody().x + 200,
            this.currentBoy.getBody().y,
            Phaser.Timer.SECOND * 1);
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

