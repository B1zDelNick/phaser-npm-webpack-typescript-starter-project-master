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

        SoundUtils.play('hip_hop');
    }

    public preload(): void {
    }

    public create(): void {
        this.bg = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
            ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Bg5);

        // Chests
        this.chest = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(528, 6,
                ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Chest)
            .page()
                .item(595, 101, 'top1',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Top1,
                    this.onItem)
                .item(696, 89, 'top2',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Top2,
                    this.onItem)
                .item(607, 206, 'top3',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Top3,
                    this.onItem)
                .item(603, 336, 'top4',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Top4,
                    this.onItem)
            .build()
            .page()
                .item(656, 92, 'top5',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Top5,
                    this.onItem)
                .item(575, 175, 'top6',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Top6,
                    this.onItem)
                .item(675, 324, 'top7',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Top7,
                    this.onItem)
            .build()
            .page()
                .item(603, 90, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Bot1,
                    this.onItem)
                .item(721, 92, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Bot2,
                    this.onItem)
                .item(611, 275, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Bot3,
                    this.onItem)
                .item(724, 298, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Bot4,
                    this.onItem)
            .build()
            .page()
                .item(605, 103, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Bot5,
                    this.onItem)
                .item(721, 102, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Bot6,
                    this.onItem)
                .item(648, 271, 'bot7',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Bot7,
                    this.onItem)
            .build()
            .page()
                .pageShelf(593, 242,
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shelf1)
                .item(594, 94, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Hair1,
                    this.onItem)
                .item(667, 100, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Hair2,
                    this.onItem)
                .item(747, 96, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Hair3,
                    this.onItem)
                .item(617, 292, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Hair4,
                    this.onItem)
                .item(724, 278, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Hair5,
                    this.onItem)
            .build()
            .page()
                .pageShelf(593, 263,
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shelf2)
                .item(614, 161, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shoe1,
                    this.onItem)
                .item(723, 164, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shoe2,
                    this.onItem)
                .item(620, 361, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shoe3,
                    this.onItem)
                .item(727, 341, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shoe4,
                    this.onItem)
            .build()
            .page()
                .pageShelf(593, 263,
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shelf2)
                .item(612, 166, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shoe5,
                    this.onItem)
                .item(734, 168, 'shoe6',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shoe6,
                    this.onItem)
                .item(662, 337, 'shoe7',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shoe7,
                    this.onItem)
            .build()
            .page()
                .pageShelf(593, 263,
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shelf2)
                .item(617, 97, 'jew1',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Jew1,
                    this.onItem)
                .item(733, 93, 'jew2',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Jew2,
                    this.onItem)
                .item(676, 286, 'jew3',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Jew3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(593, 263,
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Shelf2)
                .item(612, 182, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Glove1,
                    this.onItem)
                .item(697, 175, 'glove2',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Glove2,
                    this.onItem)
                .item(666, 369, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                    ImageUtils.getAtlasClass('AtlasesDress3State').Frames.Hat1,
                    this.onItem)
            .build()
            .category('tops', true, 0, 1, 490, 98,
                ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress3State').Frames.TopBtn)
            .category('bots', true, 2, 3, 490, 194,
                ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress3State').Frames.BotBtn)
            .category('hairs', false, 4, 4, 490, 289,
                ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress3State').Frames.HairBtn)
            .category('shoes', true, 5, 6, 490, 386,
                ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress3State').Frames.ShoeBtn)
            .category('jews', true, 7, 8, 490, 482,
                ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress3State').Frames.JewBtn)
            .categoryLeftArrow(592, 550,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Lb)
            .categoryRightArrow(757, 550,
                ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
                ImageUtils.getAtlasClass('AtlasesDress1State').Frames.Rb)
            .build('tops');

        // Dolls
        this.doll = new Doll(this, 95, 86)
            .layer(92, 17, 'hair_b',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'HB', 'HB')
            .layer(0, 12, 'body',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                null, 'Body')
            .layer(52, 11, 'glove',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'Gl', null, true)
            .layer(47, 425, 'shoe',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'S', null)
            .layer(-4, 246, 'bot',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'B', null)
            .layer(41, 7, 'top',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'T', null)
            .layer(70, 19, 'jew',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'J', null, true)
            .layer(97, 15, 'head',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                null, 'Head')
            .layer(80, 3, 'hair',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
                'H', 'H')
            .layer(89, 0, 'hat',
                ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
                ImageUtils.getAtlasClass('AtlasesDollAvrora').Frames,
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

        GameConfig.DOLL_3 = this.doll.extract();
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

