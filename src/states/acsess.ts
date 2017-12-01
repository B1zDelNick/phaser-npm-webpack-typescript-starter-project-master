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

export default class Acsess extends Phaser.State {

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

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg5').getName());

        // Chests
        this.chest = new Chest(this, 0)
            .page()
                .item(302, 156, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Hat1,
                    this.onItem)
                .item(300, 368, 'hat5',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Hat5,
                    this.onItem)
                .item(300, 293, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Hat2,
                    this.onItem)
                .item(155, 421, 'hat9',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Hat9,
                    this.onItem)
                .item(159, 292, 'bag12',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag12,
                    this.onItem)
                .item(157, 169, 'bag11',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag11,
                    this.onItem)
                .item(-8, 284, 'hat11',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Hat11,
                    this.onItem)
                .item(-7, 463, 'hat12',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Hat12,
                    this.onItem)
                .item(22, 165, 'hat13',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Hat13,
                    this.onItem)
                // right
                .item(779, 165, 'bag9',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag9,
                    this.onItem)
                .item(766, 294, 'bag8',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag8,
                    this.onItem)
            .build()
            .page()
                .item(316, 143, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Jew2,
                    this.onItem)
                .item(171, 157, 'jew5',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Jew5,
                    this.onItem)
                .item(322, 241, 'jew6',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Jew6,
                    this.onItem)
                .item(309, 393, 'hat3',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Hat3,
                    this.onItem)
                .item(156, 309, 'bag2',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag2,
                    this.onItem)
                .item(155, 404, 'bag3',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag3,
                    this.onItem)
                .item(4, 455, 'bag4',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag4,
                    this.onItem)
                .item(19, 167, 'bag5',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag5,
                    this.onItem)
                .item(6, 304, 'bag14',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag14,
                    this.onItem)
                // right
                .item(791, 273, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag1,
                    this.onItem)
                .item(763, 166, 'hat10',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Hat10,
                    this.onItem)
            .build()
            .page()
                .item(308, 125, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Jew3,
                    this.onItem)
                .item(311, 247, 'jew4',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Jew4,
                    this.onItem)
                .item(30, 463, 'jew7',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Jew7,
                    this.onItem)
                .item(23, 199, 'bag10',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag10,
                    this.onItem)
                .item(167, 432, 'bag13',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Bag13,
                    this.onItem)
                .item(171, 159, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Jew1,
                    this.onItem)
                .item(42, 309, 'glove2',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Glove2,
                    this.onItem)
                .item(173, 277, 'glove3',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Glove3,
                    this.onItem)
                .item(308, 394, 'hat3',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Hat3,
                    this.onItem)
                // right
                .item(794, 129, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Glove1,
                    this.onItem)
                .item(735, 288, 'hat4',
                    ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Hat4,
                    this.onItem)
            .build()
            .build()
            .leftArrow(2, 209,
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Lb)
            .rightArrow(895, 209,
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Rb)
            .button(624, 323, 'mmmm',
                ImageUtils.getAtlasClass('AtlasesStateDress4').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress4').Frames.Mmmm,
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
        if (name.indexOf('jew') !== -1) {
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
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('bag', index);
            this.currentDoll.on('bag_b', index);
            this.currentDoll.on('bag_f', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glove', index);
            this.currentDoll.on('glove_f', index);
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
        if (GameConfig.CURRENT_STATE === 3) GameConfig.CURRENT_STATE++;
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

