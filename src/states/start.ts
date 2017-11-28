import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {EffectUtils} from '../utils/effect.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {ILaser} from './spec-effects/laser/i.laser';
import {PreloaderUtils} from '../utils/preloader.utils';

export default class Start extends Phaser.State {

    private NEXT = 'Comix';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private laser: ILaser = null;
    private title: Phaser.Sprite = null;
    private pair1: Phaser.Sprite = null;
    private pair2: Phaser.Sprite = null;
    private glow1: Phaser.Sprite = null;
    private glow2: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.START_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.START_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.START_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        this.laser = EffectUtils.makeLaser(LaserType.PENTA_LASER);
        this.laser.init(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light3,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light4,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light5,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light6,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light7,
            ]);
        this.laser.start();

        this.glow1 = this.game.add.sprite(98, -17,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gl1);
        this.glow2 = this.game.add.sprite(98, -17,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gl2);
        this.pair1 = this.game.add.sprite(98, -17,
            ImageUtils.getAtlasClass('AtlasesStateStart2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart2').Frames.Gr1);
        this.pair2 = this.game.add.sprite(98 + 800, -17,
            ImageUtils.getAtlasClass('AtlasesStateStart2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart2').Frames.Gr2);
        this.title = this.game.add.sprite(5, 215,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Title);
        EffectUtils.makeMoveAnimation(this.title, 5, 225, Phaser.Timer.SECOND * 1);

        this.glow2.alpha = 0;

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
        const playBtn = this.gui.addPlayBtn(this.nextState);
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
        // ONLY FOR START STATE !!!!!!!!!!!!!!!!!
        if (!GameConfig.GAME_COMPLETED)
            this.game.camera.flash(0x000000, 1000);

        // Animations goes here
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75,
            GameConfig.GAME_COMPLETED ? Phaser.Timer.SECOND * 1 : Phaser.Timer.SECOND * 1);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.switchPair, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // Loads
            PreloaderUtils.preloadComixState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private switchPair() {
        if (this.glow2.alpha === 0) {
            TweenUtils.fadeOut(this.glow1);
            TweenUtils.moveOut(this.pair1, 98 + 800, -17, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
            TweenUtils.moveIn(this.pair2, 98, -17, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1.5);
            TweenUtils.fadeIn(this.glow2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.5);
        }
        else {
            TweenUtils.fadeOut(this.glow2);
            TweenUtils.moveOut(this.pair2, 98 + 800, -17, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
            TweenUtils.moveIn(this.pair1, 98, -17, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1.5);
            TweenUtils.fadeIn(this.glow1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.5);
        }
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 5, this.switchPair, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.laser) this.laser.dispose();
        if (this.title) this.title.destroy(true);
        if (this.pair1) this.pair1.destroy(true);
        if (this.pair2) this.pair2.destroy(true);
        if (this.glow1) this.glow1.destroy(true);
        if (this.glow2) this.glow2.destroy(true);

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

