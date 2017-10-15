import * as Assets from '../assets';
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

export default class Dress3 extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;
    private changing = false;

    private currentChest: Chest = null;
    private currentDoll: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private anna: Doll = null;
    private elza: Doll = null;
    private chestAnna: Chest = null;
    private chestElza: Chest = null;
    private cloud: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private mmmmContainer: Phaser.Group = null;
    private mmmm: Phaser.Button = null;

    private lArrow: Phaser.Button = null;
    private rArrow: Phaser.Button = null;
    private beginBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;

    private annaDressed: boolean = false;
    private elzaDressed: boolean = false;

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

        this.anna = null;
        this.elza = null;

        this.anna = args[0] as Doll;
        this.elza = args[1] as Doll;

        this.changing = false;
        this.annaDressed = false;
        this.elzaDressed = false;
    }

    public preload(): void {
    }

    public create(): void {
        this.game.add.sprite(0, 0,
            Assets.Atlases.AtlasesDress1State.getName(),
            Assets.Atlases.AtlasesDress1State.Frames.Bg2);

        // Chests
        this.chestAnna = new Chest(this)
            .background(9, 19, Assets.Atlases.AtlasesDress2State.getName(), Assets.Atlases.AtlasesDress2State.Frames.Chest2)
            .static()
                .item(75, 84, 'hair1',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnHair1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(197, 92, 'hair2',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnHair2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(292, 90, 'hair3',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnHair3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(86, 231, 'hair4',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnHair4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(197, 237, 'hair5',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnHair5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(304, 235, 'hair6',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnHair6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(116, 394, 'jew1',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnJew1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(214, 394, 'jew2',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnJew2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(311, 394, 'jew3',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnJew3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(155, 549, 'jew4',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnJew4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(240, 549, 'jew5',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnJew5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(327, 549, 'jew6',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.AnJew6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .build();

        this.chestElza = new Chest(this)
            .background(9, 19, Assets.Atlases.AtlasesDress2State.getName(), Assets.Atlases.AtlasesDress2State.Frames.Chest2)
            .static()
                .item(87, 92, 'hair1',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElHair1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(160, 100, 'hair2',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElHair2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(293, 98, 'hair3',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElHair3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(82, 230, 'hair4',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElHair4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(193, 221, 'hair5',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElHair5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(297, 230, 'hair6',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElHair6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(112, 384, 'jew1',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElJew1,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(214, 384, 'jew2',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElJew2,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(324, 384, 'jew3',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElJew3,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(112, 541, 'jew4',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElJew4,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(215, 541, 'jew5',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElJew5,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .item(325, 541, 'jew6',
                    Assets.Atlases.AtlasesDress3State.getName(),
                    Assets.Atlases.AtlasesDress3State.Frames.ElJew6,
                    this.onItem, GuiUtils.addCustomOverGlowHandler(0xffff66))
                .build()
            .build();

        // Dolls
        this.anna.insert();
        this.elza.insert();

        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            this.mmmmContainer = this.game.add.group();
            this.mmmm = GuiUtils.makeButton(this, this.mmmmContainer,
                831, 140, 1, '',
                Assets.Atlases.AtlasesDress2State.getName(),
                Assets.Atlases.AtlasesDress2State.Frames.Mmmm,
                false, true, true,
                GuiUtils.goLinkInMoreGames,
                GuiUtils.addCustomOverHandler(0xffff66),
                GuiUtils.addCustomOutHandler()
            );
        }

        this.cloud = this.game.add.sprite(435, 146,
            Assets.Atlases.AtlasesDress3State.getName(),
            Assets.Atlases.AtlasesDress3State.Frames.Cl5);

        this.cloud.alpha = 0;
        this.anna.show(true);
        this.elza.hide(true);

        // GUI Buttons
        this.gui.addGui(false);
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 189, 720 - 182,
            Assets.Atlases.AtlasesStartState.getName(),
            Assets.Atlases.AtlasesStartState.Frames.EMore,
            GuiUtils.addOverScaleHandler,
            GuiUtils.addOutScaleHandler
        );
        this.lArrow = this.gui.addExtraBtn(460, 340,
            Assets.Atlases.AtlasesGuiFgc.getName(),
            Assets.Atlases.AtlasesGuiFgc.Frames.LArrFgc,
            this.changeDoll,
            GuiUtils.addCustomOverHandler(0xffff66, .79),
            GuiUtils.addCustomOutHandler(.75)
        );
        this.rArrow = this.gui.addExtraBtn(740, 340,
            Assets.Atlases.AtlasesGuiFgc.getName(),
            Assets.Atlases.AtlasesGuiFgc.Frames.RArrFgc,
            this.changeDoll,
            GuiUtils.addCustomOverHandler(0xffff66, .79),
            GuiUtils.addCustomOutHandler(.75)
        );
        this.beginBtn = this.gui.addExtraBtn(781, 395,
            Assets.Atlases.AtlasesGuiFgc.getName(),
            Assets.Atlases.AtlasesGuiFgc.Frames.DoneFgc,
            () => {
                TweenUtils.fadeAndScaleOut(this.beginBtn, Phaser.Timer.SECOND * .5)[1]
                    .onComplete.addOnce(() => {
                        this.beginBtn.visible = false;
                    }, this);
                new Animation()
                    .add(this.cloud, { alpha: 0 }, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0)
                    .animate(() => {
                        this.chestAnna.show();
                        TweenUtils.customFadeAndScaleIn(this.lArrow, 1, .75, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                        TweenUtils.customFadeAndScaleIn(this.rArrow, 1, .75, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
                            this.mmmm.inputEnabled = true;
                            this.mmmm.filters = [EffectUtils.makeGlowAnimation(0xffff66)];
                        }
                    }, this);
            },
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        this.beginBtn.scale.setTo(0);
        this.beginBtn.alpha = 0;
        this.lArrow.scale.setTo(0);
        this.lArrow.alpha = 0;
        this.rArrow.scale.setTo(0);
        this.rArrow.alpha = 0;
        moreBtn.filters = [EffectUtils.makeGlowAnimation(0xff33ff)];
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
        this.currentChest = this.chestAnna;
        this.currentDoll = this.anna;

        // Animations goes here
        new Animation()
            .add(this.cloud, { alpha: 1 }, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.5)
            .animate(() => {
                TweenUtils.fadeAndScaleIn(this.beginBtn, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
            }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadFinalState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;

        if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('hair', index);
            this.currentDoll.on('hair_b', index);
        }
        else if (name.indexOf('jew') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('jew', index);
        }

        if (this.currentDoll === this.anna) this.annaDressed = true;
        if (this.currentDoll === this.elza) this.elzaDressed = true;

        if (this.playBtn.alpha === 0 && this.annaDressed && this.elzaDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(): void {
        if (this.changing) return;
        this.changing = true;

        this.currentDoll.hide();
        this.currentChest.hide();

        if (this.currentDoll === this.anna) {
            this.currentDoll = this.elza;
            this.currentChest = this.chestElza;
        } else {
            this.currentDoll = this.anna;
            this.currentChest = this.chestAnna;
        }

        this.game.time.events.add(Phaser.Timer.SECOND *  .5, () => {
            this.currentDoll.show();
            this.currentChest.show();

            this.game.time.events.add(Phaser.Timer.SECOND *  1, () => {
                this.changing = false;
            }, this);
        }, this);
    }

    private nextPage(): void {
        this.currentChest.nextPage();
    }

    private prevPage(): void {
        this.currentChest.prevPage();
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.currentDoll = null;
        this.currentChest = null;

        this.chestAnna.disable();
        this.chestElza.disable();

        this.cloud.destroy(true);
        this.mmmmContainer.destroy(true);
        this.mmmm.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        this.anna.extract();
        this.elza.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.chestAnna.disable();
        this.chestElza.disable();
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
            this.game.state.start(this.NEXT, true, false, this.anna, this.elza);
        } else {
            if (addLoader) {
                this.spinner = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Images.ImagesSpin.getName());
                this.spinner.anchor.setTo(.5, .5);
                // this.spinner.scale.setTo(.5);
                TweenUtils.rotate(this.spinner, 360, Phaser.Timer.SECOND * 1, 0, -1);
            }
            this.game.time.events.add(Phaser.Timer.SECOND *  .25, this.reallyGoNextState, this);
        }
    }
}

