import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {ILaser} from './spec-effects/laser/i.laser';
import {EffectUtils} from '../utils/effect.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {Animation} from '../utils/animation/anim';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';

export default class Comix extends Phaser.State {

    private NEXT = 'Pread';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private girl3: Phaser.Sprite = null;
    private girl4: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
    private cloud3: Phaser.Sprite = null;
    private cloud4: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.COMIX_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.COMIX_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.COMIX_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg2').getName());

        this.girl1 = this.game.add.sprite(440, 257 + 700,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Gr1);
        this.girl2 = this.game.add.sprite(751 + 500, 120,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Gr2);
        this.girl3 = this.game.add.sprite(184, 259 + 700,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Gr3);
        this.girl4 = this.game.add.sprite(0 - 500, 150,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Gr4);

        this.cloud1 = this.game.add.sprite(500, 26,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Cl1);
        this.cloud2 = this.game.add.sprite(688, 330,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Cl2);
        this.cloud3 = this.game.add.sprite(168, 21,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Cl3);
        this.cloud4 = this.game.add.sprite(6, 325,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.Cl4);

        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;
        this.cloud3.alpha = 0;
        this.cloud4.alpha = 0;

        // GUI Buttons
        this.gui.addGui(false);
        this.gui.addExtraMoreAnimated(
            960 - 168, 720 - 173,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1781833').getName(), 1 / 3, true,
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );
        const playBtn = this.gui.addExtraBtn(349, 603,
            ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
            ImageUtils.getAtlasClass('AtlasesStateComix').Frames.StartBtn,
            this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.moveIn(this.girl1, 440, 257, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeIn(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
        TweenUtils.moveIn(this.girl2, 751, 120, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3);
        TweenUtils.fadeIn(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 4);
        TweenUtils.moveIn(this.girl3, 184, 259, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 5);
        TweenUtils.fadeIn(this.cloud3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 6);
        TweenUtils.moveIn(this.girl4, 0, 150, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 7);
        TweenUtils.fadeIn(this.cloud4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 8);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 9);

        // Assets Managment starts here
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress1State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.girl1) this.girl1.destroy(true);
        if (this.girl2) this.girl2.destroy(true);
        if (this.girl3) this.girl3.destroy(true);
        if (this.girl4) this.girl4.destroy(true);
        if (this.cloud1) this.cloud1.destroy(true);
        if (this.cloud2) this.cloud2.destroy(true);
        if (this.cloud3) this.cloud3.destroy(true);
        if (this.cloud4) this.cloud4.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
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

