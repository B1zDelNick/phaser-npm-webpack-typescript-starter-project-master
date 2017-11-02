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
import {LaserType} from './spec-effects/laser/enum.laser';
import {ILaser} from './spec-effects/laser/i.laser';

export default class Result extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private shad: Phaser.Sprite = null;
    private container: Phaser.Group = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.RESULT_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.RESULT_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.RESULT_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.container = this.game.add.group();
        this.container.add(this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg6').getName()));

        this.shad = this.game.add.sprite(178 + 700, 447,
            ImageUtils.getAtlasClass('AtlasesStateResult').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult').Frames.Shad);

        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_1.setPosition(408 + 700, 7);
        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_2.setPosition(238 + 700, 14);
        GameConfig.DOLL_1.setAlpha(1);
        GameConfig.DOLL_2.setAlpha(1);

        this.container.add(this.shad);
        this.container.add(GameConfig.DOLL_1.getBody());
        this.container.add(GameConfig.DOLL_2.getBody());

        // GUI Buttons
        this.gui.addGui(false);
        const playBtn = this.gui.addPlayBtn(this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;
        this.gui.addExtraMoreAnimated(
            960 - 168, 720 - 173,
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1781833').getName(), 1 / 3, true,
            GuiUtils.addOverHandlerMcg,
            GuiUtils.addOutHandlerMcg
        );

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.moveAndScaleIn(GameConfig.DOLL_1.getBody(), 408, 7, 1, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.moveAndScaleIn(GameConfig.DOLL_2.getBody(), 238, 14, 1, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.moveAndScaleIn(this.shad, 178, 447, 1, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadFinalState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        TweenUtils.delayedCall(Phaser.Timer.SECOND * 11, this.nextState, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        this.game.world.remove(this.container);
        GameConfig.CONT_1 = this.container;
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.CURRENT_STATE = 0;
        GameConfig.FREE_RESULT = null;
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

