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
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        // Chests
        this.chest = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(336, 63,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .item(421, 122, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress1,
                    this.onItem)
                .item(495, 127, 'dress2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress2,
                    this.onItem)
                .item(555, 126, 'dress3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress3,
                    this.onItem)
                .item(624, 126, 'dress4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress4,
                    this.onItem)
                .item(685, 127, 'dress5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress5,
                    this.onItem)
                .item(786, 128, 'dress6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress6,
                    this.onItem)
            .build()
            .page()
                .item(384, 124, 'dress7',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress7,
                    this.onItem)
                .item(451, 127, 'dress8',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress8,
                    this.onItem)
                .item(531, 130, 'dress9',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress9,
                    this.onItem)
                .item(599, 125, 'dress10',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress10,
                    this.onItem)
                .item(648, 127, 'dress11',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress11,
                    this.onItem)
                .item(724, 128, 'dress12',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress12,
                    this.onItem)
                .item(791, 127, 'dress13',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress13,
                    this.onItem)
            .build()
            .static()
                .item(365, 543, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe1,
                    this.onItem)
                .item(442, 568, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe2,
                    this.onItem)
                .item(514, 560, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe3,
                    this.onItem)
                .item(587, 552, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe4,
                    this.onItem)
                .item(657, 546, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe5,
                    this.onItem)
                .item(726, 554, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Shoe6,
                    this.onItem)
                .animatedItem(686, 365, 'mmmm',
                    ImageUtils.getSpritesheetClass('SpritesheetsMmmm31691794').getName(),
                    [1, 2, 3, 4], 5, true,
                    GuiUtils.goLinkInMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler)
                .compoundItem(7, 1, 7, 572, 353, 'jew',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames, 'Jew',
                    this.onItem)
                .compoundItem(6, 1, -1, 432, 310, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames, 'Hair',
                    this.onItem)
            .build()
            .leftArrow(362, 357,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(880, 357,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        // Dolls
        this.doll = new Doll(this, 111, 32)
            .layer(46, 7, 'hair_b',
                'AtlasesDollBelle',
                'HB', 'HB')
            .layer(3, 74, 'body',
                'AtlasesDollBelle',
                'Body', 'Body')
            .layer(77, 559, 'shoe',
                'AtlasesDollBelle',
                'S', null)
            .layer(-3, 99, 'dress',
                'AtlasesDollBelle',
                'D', 'D1')
            .layer(85, 8, 'head',
                'AtlasesDollBelle',
                'Head', 'Head')
            .layer(84, 65, 'jew',
                'AtlasesDollBelle',
                'J', null, true)
            .layer(52, -32, 'hair',
                'AtlasesDollBelle',
                'H', 'H');

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW, true);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(770, 535,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE21720925').getName(),
                null, 8, true);
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
            if (this.doll.on('dress', index + 1, 'top', 'bot', 'und'))
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
            this.doll.on('jew_b', index);
            // this.doll.on('jew_f', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('hat', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.doll.on('bag', index);
            this.doll.on('bag_b', index);
            this.doll.on('bag_f', index);
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
        TweenUtils.moveInOut(this.doll.getBody(), this.doll.getBody().x + 200, this.doll.getBody().y, Phaser.Timer.SECOND * 2);
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

