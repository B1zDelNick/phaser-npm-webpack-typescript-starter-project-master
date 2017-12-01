import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {EffectUtils} from '../utils/effect.utils';
import {AdUtils} from '../utils/ad/ad.utils';
import {SoundUtils} from '../utils/sound/sound.utils';

export default class Place extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private container: Phaser.Group = null;
    private sel1: Phaser.Button = null;
    private sel2: Phaser.Button = null;
    private sel3: Phaser.Button = null;
    private sel4: Phaser.Button = null;
    private playBtn: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.SELECT_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.SELECT_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.SELECT_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg6').getName());

        GameConfig.DOLL_4.insert();
        GameConfig.DOLL_3.insert();
        GameConfig.DOLL_3.setAlpha(1);
        GameConfig.DOLL_4.setAlpha(1);
        GameConfig.DOLL_3.setPosition(306, -59);
        GameConfig.DOLL_4.setPosition(453, -49);

        this.container = this.game.add.group();
        this.sel1 = GuiUtils.makeButton(
            this, this.container, 210, 15, 1,
            'sel1', ImageUtils.getAtlasClass('AtlasesStatePlace').getName(),
            ImageUtils.getAtlasClass('AtlasesStatePlace').Frames.Sel1,
            true, true, true,
            this.select,
            GuiUtils.addOverHandler, GuiUtils.addOutHandler
        );
        this.sel2 = GuiUtils.makeButton(
            this, this.container, -12, 100, 1,
            'sel2', ImageUtils.getAtlasClass('AtlasesStatePlace').getName(),
            ImageUtils.getAtlasClass('AtlasesStatePlace').Frames.Sel2,
            true, true, true,
            this.select,
            GuiUtils.addOverHandler, GuiUtils.addOutHandler
        );
        this.sel3 = GuiUtils.makeButton(
            this, this.container, 304, 275, 1,
            'sel3', ImageUtils.getAtlasClass('AtlasesStatePlace').getName(),
            ImageUtils.getAtlasClass('AtlasesStatePlace').Frames.Sel3,
            true, true, true,
            this.select,
            GuiUtils.addOverHandler, GuiUtils.addOutHandler
        );
        this.sel4 = GuiUtils.makeButton(
            this, this.container, 81, 361, 1,
            'sel4', ImageUtils.getAtlasClass('AtlasesStatePlace').getName(),
            ImageUtils.getAtlasClass('AtlasesStatePlace').Frames.Sel4,
            true, true, true,
            this.select, GuiUtils.addOverHandler, GuiUtils.addOutHandler
        );
        this.sel1.scale.setTo(0);
        this.sel2.scale.setTo(0);
        this.sel3.scale.setTo(0);
        this.sel4.scale.setTo(0);
        this.sel1.alpha = 0;
        this.sel2.alpha = 0;
        this.sel4.alpha = 0;

        // GUI Buttons
        this.gui.addGui();
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

        // Animations goes here
        TweenUtils.fadeAndScaleIn(this.sel1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(this.sel2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.5);
        TweenUtils.fadeAndScaleIn(this.sel3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(this.sel4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.5, () => {
            //
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress1State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private select(sprite: Phaser.Button) {
        const ind = parseInt(sprite.name.substr(3));
        GameConfig.SELECTED_BG = ind;
        this.bg.loadTexture(ImageUtils.getImageClass('ImagesFon' + ind).getName());
        if (this.playBtn.alpha === 0) {
            TweenUtils.fadeAndScaleIn(this.playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .5);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.bg.destroy(true);
        this.sel1.destroy(true);
        this.sel2.destroy(true);
        this.sel3.destroy(true);
        this.sel4.destroy(true);
        this.container.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_3.extract();
        GameConfig.DOLL_4.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(sprite: Phaser.Button): void {
        this.gui.disable();
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

