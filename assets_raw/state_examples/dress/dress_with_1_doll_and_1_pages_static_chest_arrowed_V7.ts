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

export default class Nbbdfgdgdfgdfgdfg extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;
    private doll: Doll = null;
    private chest: Chest = null;
    private spinner: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
    private btnContainer: Phaser.Group = null;
    private mmmm: Phaser.Button = null;
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
            .background(0, 8,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Chest)
            .page()
                .item(354, 206, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress1,
                    this.onItem)
                .item(255, 210, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress2,
                    this.onItem)
                .item(136, 207, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress3,
                    this.onItem)
            .build()
            .page()
                .item(352, 207, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress4,
                    this.onItem)
                .item(242, 207, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress5,
                    this.onItem)
                .item(138, 207, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress6,
                    this.onItem)
            .build()
            .static()
                .item(7, 173, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair1,
                    this.onItem)
                .item(10, 268, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair2,
                    this.onItem)
                .item(4, 359, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair3,
                    this.onItem)
                .item(515, 172, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair4,
                    this.onItem)
                .item(506, 268, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair5,
                    this.onItem)
                .item(518, 366, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair6,
                    this.onItem)
                .item(152, 584, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe1,
                    this.onItem)
                .item(489, 558, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe2,
                    this.onItem)
                .item(319, 574, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe3,
                    this.onItem)
                .item(403, 590, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe4,
                    this.onItem)
                .item(230, 589, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Shoe5,
                    this.onItem)
                .item(246, 42, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Acs1,
                    this.onItem)
                .item(308, 13, 'acs2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Acs2,
                    this.onItem)
                .item(384, 43, 'glass1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Glass1,
                    this.onItem)
                .item(457, -3, 'bag1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bag1,
                    this.onItem)
            .build()
            .leftArrow(204, 115,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Lb)
            .rightArrow(332, 115,
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Rb)
            .build();

        this.btnContainer = this.game.add.group();
        this.mmmm =
            GuiUtils.makeButton(this, this.btnContainer,
                736, 92, 1, '',
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Mmmm,
            GameConfig.PUB_MODE === PublishMode.NORMAL, true, GameConfig.PUB_MODE === PublishMode.NORMAL,
            GuiUtils.goLinkInMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        // Dolls
        this.doll = new Doll(this, 606, 40)
            .layer(0, 0, 'hair_b',
                'AtlasesDollEric',
                'HB', 'HB')
            .layer(0, 0, 'body',
                'AtlasesDollEric',
                'Body', 'Body')
            .layer(0, 0, 'acs',
                'AtlasesDollEric',
                'Ac', null, true)
            .layer(0, 0, 'shoe',
                'AtlasesDollEric',
                'S', 'S')
            .layer(0, 0, 'dress',
                'AtlasesDollEric',
                'D', 'D')
            .layer(0, 0, 'bag',
                'AtlasesDollEric',
                'Bb', null, true)
            .layer(0, 0, 'hair',
                'AtlasesDollEric',
                'H', 'H')
            .layer(0, 0, 'hand',
                'AtlasesDollEric',
                'Hand', 'Hand')
            .layer(0, 0, 'glass',
                'AtlasesDollEric',
                'Gs', null, true);

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW, true);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            const moreBtn = this.gui.addExtraMore(799, 460,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE);
            TweenUtils.callEvery(Phaser.Timer.SECOND * 2, () => {
                EffectUtils.makeRotateAnimation(moreBtn, 100, -10);
            }, this);
            const fl1 = this.game.add.sprite(799, 460,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
            const fl2 = this.game.add.sprite(799, 460,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
            fl1.alpha = 0;
            fl2.alpha = 0;
            EffectUtils.makeAlphaAnimation(fl1);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, () => {
                EffectUtils.makeAlphaAnimation(fl2);
            }, this);
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
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.chest.show, this.chest);

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
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('acs', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('bag', index);
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

        GameConfig.DOLL_2 = this.doll.extract();
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

