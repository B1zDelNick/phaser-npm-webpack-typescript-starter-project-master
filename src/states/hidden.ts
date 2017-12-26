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

export default class Hidden extends Phaser.State {

    private NEXT = 'Dress';
    private nextPrepared = false;

    private bg: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
    private gui: IGui = null;
    private saver: ISaver = null;
    private chest: Chest = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private playBtn: Phaser.Button = null;
    private skipBtn: Phaser.Button = null;
    private arr = [];

    private total: number;

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
        this.chest = null;
        this.total = 0;
        this.arr = [];
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        // Chests
        this.chest = new Chest(this, 0)
            .static()
                .item(290, 602, 'item1',
                    ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.It1,
                    this.onItem)
                .item(216, 451, 'item2',
                    ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.It2,
                    this.onItem)
                .item(701, 429, 'item3',
                    ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.It3,
                    this.onItem)
                .item(476, 326, 'item4',
                    ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.It4,
                    this.onItem)
                .item(452, 471, 'item5',
                    ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.It5,
                    this.onItem)
                .item(725, 68, 'item6',
                    ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.It6,
                    this.onItem)
                .item(214, 113, 'item7',
                    ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.It7,
                    this.onItem)
                .item(423, 86, 'item8',
                    ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.It8,
                    this.onItem)
                .item(99, 297, 'item9',
                    ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.It9,
                    this.onItem)
                .item(312, 339, 'item10',
                    ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.It10,
                    this.onItem)
                .build()
            .build();

        this.arr['item1'] = this.game.add.sprite(16, 115,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.ItIc11);
        this.arr['item2'] = this.game.add.sprite(16, 209,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.ItIc21);
        this.arr['item3'] = this.game.add.sprite(16, 304,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.ItIc31);
        this.arr['item4'] = this.game.add.sprite(16, 398,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.ItIc41);
        this.arr['item5'] = this.game.add.sprite(16, 490,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.ItIc51);
        this.arr['item6'] = this.game.add.sprite(862, 115,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.ItIc61);
        this.arr['item7'] = this.game.add.sprite(862, 209,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.ItIc71);
        this.arr['item8'] = this.game.add.sprite(862, 304,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.ItIc81);
        this.arr['item9'] = this.game.add.sprite(862, 398,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.ItIc91);
        this.arr['item10'] = this.game.add.sprite(862, 490,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.ItIc101);

        this.cloud1 = this.game.add.sprite(202, 95,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.Cl1);
        this.cloud2 = this.game.add.sprite(202, 95,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.Cl2);

        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;
        this.chest.disable();

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(
                960 - 154, 720 - 149,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE15414913').getName(), [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
                ], 10, true
            );
        }
        this.skipBtn = this.gui.addExtraBtn(0, 720 - 135,
            ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
            ImageUtils.getAtlasClass('AtlasesStateHidden').Frames.Skip,
            this.nextState,
            GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.skipBtn.scale.setTo(0);
        this.skipBtn.alpha = 0;
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
        TweenUtils.fadeIn(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1, () => {
            TweenUtils.fadeOut(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3, () => {
                TweenUtils.fadeAndScaleIn(this.skipBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
                this.chest.enable();
            }, this);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress2State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
    }

    private onItem(item: Phaser.Button): void {
        (item.parent as Phaser.Group).setChildIndex(item, (item.parent as Phaser.Group).children.length - 1);
        // this.chest.disable();
        item.inputEnabled = false;
        const scale = 350 / item.height;
        item.filters = [EffectUtils.makeLightGlowAnimation(0x00ff00, 500)];
        /*console.log(this.arr[item.name]);
        this.arr[item.name].filters = [EffectUtils.makeLightGlowAnimation(0x00ff00, 500)];*/
        TweenUtils.scale(item, scale < 1 ? scale : 1.1, Phaser.Timer.SECOND * 2, 0, () => {
            TweenUtils.fadeAndScaleOut(item, Phaser.Timer.SECOND * .75, 0, () => {
                this.arr[item.name].filters = null;
                this.arr[item.name].loadTexture(
                    ImageUtils.getAtlasClass('AtlasesStateHidden').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateHidden').Frames[`ItIc${item.name.substr(4)}`]
                );
                item.visible = false;
                this.total++;
                if (this.total === 10) {
                    TweenUtils.fadeAndScaleOut(this.skipBtn, Phaser.Timer.SECOND * .75, 0);
                    TweenUtils.fadeIn(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1, () => {
                        TweenUtils.fadeAndScaleIn(this.playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
                    }, this);
                }
            }, this);
        }, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.cloud1) this.cloud1.destroy(true);
        if (this.cloud2) this.cloud2.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.chest.dispose();

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
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

