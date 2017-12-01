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

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName());

        // Chests
        this.chest = new Chest(this, 0)
            .page()
                .item(280, 46, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress3,
                    this.onItem)
                .item(140, 46, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress1,
                    this.onItem)
                .item(100, 50, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress4,
                    this.onItem)
                .item(3, 49, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress2,
                    this.onItem)
                .item(-4, 54, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress5,
                    this.onItem)
                .item(770, 35, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe1,
                    this.onItem)
                .item(763, 167, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe2,
                    this.onItem)
                .item(854, 291, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe3,
                    this.onItem)
                .item(778, 281, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe4,
                    this.onItem)
                .item(832, 179, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe5,
                    this.onItem)
                .item(843, 60, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe6,
                    this.onItem)
            .build()
            .page()
                .item(276, 46, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress6,
                    this.onItem)
                .item(184, 48, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress7,
                    this.onItem)
                .item(115, 50, 'dress8',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress8,
                    this.onItem)
                .item(6, 47, 'dress9',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress9,
                    this.onItem)
                .item(-6, 50, 'dress10',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress10,
                    this.onItem)
                .item(854, 290, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe7,
                    this.onItem)
                .item(777, 272, 'shoe8',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe8,
                    this.onItem)
                .item(767, 47, 'shoe9',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe9,
                    this.onItem)
                .item(771, 158, 'shoe10',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe10,
                    this.onItem)
                .item(831, 178, 'shoe11',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe11,
                    this.onItem)
                .item(846, 64, 'shoe12',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe12,
                    this.onItem)
            .build()
            .page()
                .item(312, 42, 'dress11',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress11,
                    this.onItem)
                .item(160, 47, 'dress12',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress12,
                    this.onItem)
                .item(-11, 45, 'dress13',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress13,
                    this.onItem)
                .item(-7, 47, 'dress14',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress14,
                    this.onItem)
                .item(-5, 50, 'dress15',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress15,
                    this.onItem)
                .item(770, 35, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe1,
                    this.onItem)
                .item(763, 167, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe2,
                    this.onItem)
                .item(854, 291, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe3,
                    this.onItem)
                .item(778, 281, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe4,
                    this.onItem)
                .item(832, 179, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe5,
                    this.onItem)
                .item(843, 60, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe6,
                    this.onItem)
            .build()
            .page()
                .item(313, 41, 'dress19',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress19,
                    this.onItem)
                .item(101, 42, 'dress17',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress17,
                    this.onItem)
                .item(87, 45, 'dress18',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress18,
                    this.onItem)
                .item(-6, 51, 'dress20',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress20,
                    this.onItem)
                .item(-5, 49, 'dress16',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress16,
                    this.onItem)
                .item(854, 290, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe7,
                    this.onItem)
                .item(777, 272, 'shoe8',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe8,
                    this.onItem)
                .item(767, 47, 'shoe9',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe9,
                    this.onItem)
                .item(771, 158, 'shoe10',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe10,
                    this.onItem)
                .item(831, 178, 'shoe11',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe11,
                    this.onItem)
                .item(846, 64, 'shoe12',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe12,
                    this.onItem)
            .build()
            .build()
            .leftArrow(2, 209,
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Lb)
            .rightArrow(895, 209,
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Rb)
            .button(637, 336, 'mmmm',
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Mmmm,
                GuiUtils.goLinkInMoreGames)
            .build();

        // Dolls
        if (GameConfig.DOLL_3 !== null) {
            this.ariel = GameConfig.DOLL_3.insert();
            this.cindy = GameConfig.DOLL_4.insert();
            this.ariel.setPosition(250, -69);
            this.cindy.setPosition(252, -61);
        }
        else {
            this.ariel = new Doll(this, 250, -69)
                .layer(0, 0, 'hair_b',
                    'AtlasesDollSnow',
                    'HB', GameConfig.FREE_RESULT.snHair === 0 ? 'HB' : 'HB' + GameConfig.FREE_RESULT.snHair)
                .layer(0, 0, 'jew_b',
                    'AtlasesDollSnow',
                    'JB', null, true)
                .layer(0, 0, 'bag_b',
                    'AtlasesDollSnow',
                    'BbB', null, true)
                .layer(0, 0, 'hat_b',
                    'AtlasesDollSnow',
                    'HtB', null, true)
                .layer(0, 0, 'dress_b',
                    'AtlasesDollSnow',
                    'DB', null)
                .layer(0, 0, 'body',
                    'AtlasesDollSnow',
                    'Body', 'Body')
                .layer(0, 0, 'rum',
                    'AtlasesDollSnow',
                    'Rm', GameConfig.FREE_RESULT.snRum === 0 ? null : 'Rm' + GameConfig.FREE_RESULT.snRum)
                .layer(0, 0, 'lip',
                    'AtlasesDollSnow',
                    'Lp', GameConfig.FREE_RESULT.snLip === 0 ? 'Lp' : 'Lp' + GameConfig.FREE_RESULT.snLip)
                .layer(0, 0, 'shad',
                    'AtlasesDollSnow',
                    'Sh', GameConfig.FREE_RESULT.snShad === 0 ? 'Sh' : 'Sh' + GameConfig.FREE_RESULT.snShad)
                .layer(0, 0, 'eyes',
                    'AtlasesDollSnow',
                    'Eyes', 'Eyes')
                .layer(0, 0, 'res',
                    'AtlasesDollSnow',
                    'Rs', GameConfig.FREE_RESULT.snRes === 0 ? 'Rs' : 'Rs' + GameConfig.FREE_RESULT.snRes)
                .layer(0, 0, 'shoe',
                    'AtlasesDollSnow',
                    'S', null)
                .layer(0, 0, 'und',
                    'AtlasesDollSnow',
                    'Und', 'Und')
                .layer(0, 0, 'glove',
                    'AtlasesDollSnow',
                    'Gl', null, true)
                .layer(0, 0, 'dress',
                    'AtlasesDollSnow',
                    'D', null)
                .layer(0, 0, 'jew',
                    'AtlasesDollSnow',
                    'J', null, true)
                .layer(0, 0, 'hair',
                    'AtlasesDollSnow',
                    'H', GameConfig.FREE_RESULT.snHair === 0 ? 'H' : 'H' + GameConfig.FREE_RESULT.snHair)
                .layer(0, 0, 'jew_f',
                    'AtlasesDollSnow',
                    'JF', null, true)
                .layer(0, 0, 'hat',
                    'AtlasesDollSnow',
                    'Ht', null, true)
                .layer(0, 0, 'bag',
                    'AtlasesDollSnow',
                    'Bb', null, true);
            this.cindy = new Doll(this, 252, -61)
                .layer(0, 0, 'hair_b',
                    'AtlasesDollCindy',
                    'HB', GameConfig.FREE_RESULT.ciHair === 0 ? 'HB' : 'HB' + GameConfig.FREE_RESULT.ciHair)
                .layer(0, 0, 'jew_b',
                    'AtlasesDollCindy',
                    'JB', null, true)
                .layer(0, 0, 'bag_b',
                    'AtlasesDollCindy',
                    'BbB', null, true)
                .layer(0, 0, 'hat_b',
                    'AtlasesDollCindy',
                    'HtB', null, true)
                .layer(0, 0, 'dress_b',
                    'AtlasesDollCindy',
                    'DB', null)
                .layer(0, 0, 'body',
                    'AtlasesDollCindy',
                    'Body', 'Body')
                .layer(0, 0, 'rum',
                    'AtlasesDollCindy',
                    'Rm', GameConfig.FREE_RESULT.ciRum === 0 ? null : 'Rm' + GameConfig.FREE_RESULT.ciRum)
                .layer(0, 0, 'lip',
                    'AtlasesDollCindy',
                    'Lp', GameConfig.FREE_RESULT.ciLip === 0 ? 'Lp' : 'Lp' + GameConfig.FREE_RESULT.ciLip)
                .layer(0, 0, 'shad',
                    'AtlasesDollCindy',
                    'Sh', GameConfig.FREE_RESULT.ciShad === 0 ? 'Sh' : 'Sh' + GameConfig.FREE_RESULT.ciShad)
                .layer(0, 0, 'eyes',
                    'AtlasesDollCindy',
                    'Eyes', 'Eyes')
                .layer(0, 0, 'res',
                    'AtlasesDollCindy',
                    'Rs', GameConfig.FREE_RESULT.ciRes === 0 ? 'Rs' : 'Rs' + GameConfig.FREE_RESULT.ciRes)
                .layer(0, 0, 'shoe',
                    'AtlasesDollCindy',
                    'S', null)
                .layer(0, 0, 'und',
                    'AtlasesDollCindy',
                    'Und', 'Und')
                .layer(0, 0, 'glove',
                    'AtlasesDollCindy',
                    'Gl', null, true)
                .layer(0, 0, 'dress',
                    'AtlasesDollCindy',
                    'D', null)
                .layer(0, 0, 'bag',
                    'AtlasesDollCindy',
                    'Bb', null, true)
                .layer(0, 0, 'hand',
                    'AtlasesDollCindy',
                    'Hand', 'Hand')
                .layer(0, 0, 'glove_f',
                    'AtlasesDollCindy',
                    'GlF', null, true)
                .layer(0, 0, 'jew',
                    'AtlasesDollCindy',
                    'J', null, true)
                .layer(0, 0, 'hair',
                    'AtlasesDollCindy',
                    'H', GameConfig.FREE_RESULT.ciHair === 0 ? 'H' : 'H' + GameConfig.FREE_RESULT.ciHair)
                .layer(0, 0, 'jew_f',
                    'AtlasesDollCindy',
                    'JF', null, true)
                .layer(0, 0, 'hat',
                    'AtlasesDollCindy',
                    'Ht', null, true)
                .layer(0, 0, 'bag_f',
                    'AtlasesDollCindy',
                    'Bb', null, true, [2, 3, 6, 7, 8, 9, 11, 12]);
        }

        this.ariel.show(true);
        this.cindy.hide(true);

        // GUI Buttons
        this.gui.addGui();
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        this.arBtn = this.gui.addExtraBtn(823, 382,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.SnBtn,
            this.changeDoll
        );
        this.ciBtn = this.gui.addExtraBtn(823, 382,
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
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
            this.chest.show();
            TweenUtils.fadeAndScaleIn(this.ciBtn, Phaser.Timer.SECOND * .75);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentDoll.on('dress', index, 'top', 'bot', 'und'))
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            this.currentDoll.on('dress_b', index);
            // this.currentDoll.on('dress_f', index);
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.chest.onEquiped(name, 'shoe');
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

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_3 = this.ariel.extract();
        GameConfig.DOLL_4 = this.cindy.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        if (GameConfig.CURRENT_STATE === 2) GameConfig.CURRENT_STATE++;
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.move(this.currentDoll.getBody(), this.currentDoll.getBody().x - 100, this.currentDoll.getBody().y, Phaser.Timer.SECOND * 1);
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

