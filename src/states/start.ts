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
import {IParticle} from './spec-effects/particle/i.particle';
import {FallParticles} from './spec-effects/particle/fall.particle';
import {BubbleParticles} from './spec-effects/particle/bubble.particle';

export default class Start extends Phaser.State {

    private NEXT = 'Comix';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private fg: Phaser.Sprite = null;
    private bg1: Phaser.Sprite = null;
    private bg2: Phaser.Sprite = null;
    private bg3: Phaser.Sprite = null;
    private like: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private phase: number = -1;

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
        this.phase = -1;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg1 = this.game.add.sprite(82, -36, ImageUtils.getImageClass('ImagesBack1').getName());
        this.bg2 = this.game.add.sprite(82, -36, ImageUtils.getImageClass('ImagesBack2').getName());
        this.bg3 = this.game.add.sprite(82, -36, ImageUtils.getImageClass('ImagesBack3').getName());
        this.bg1.alpha = 0;
        this.bg2.alpha = 0;

        this.like = this.game.add.sprite(410, 360,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Like);
        GuiUtils.centrize(this.like);
        this.like.alpha = 0;
        this.like.scale.setTo(0);

        this.fg = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesCommons').getName(),
            ImageUtils.getAtlasClass('AtlasesCommons').Frames.Fg);

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(812, 514,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE1482068').getName(),
                [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
        }
        const playBtn = this.gui.addPlayBtn(this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this, 479, 592);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }
        // ONLY FOR START STATE !!!!!!!!!!!!!!!!!
        if (!GameConfig.GAME_COMPLETED)
            this.game.camera.flash(0x000000, 1000);

        // Animations goes here
        TweenUtils.fadeAndScaleIn(this.like, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1, () => {
            TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 0, this.nextGirls, this);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // Loads
            PreloaderUtils.preloadComixState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private nextGirls() {
        this.phase++;
        if (this.phase > 2) this.phase = 0;
        let obj1: any;
        let obj2: any;
        if (this.phase === 0) {
            obj1 = this.bg3;
            obj2 = this.bg1;
        }
        else if (this.phase === 1) {
            obj1 = this.bg1;
            obj2 = this.bg2;
        }
        else if (this.phase === 2) {
            obj1 = this.bg2;
            obj2 = this.bg3;
        }
        EffectUtils.makeMoveAnimation(this.like, this.like.x + 6, this.like.y + 6, 200, true, 0);
        EffectUtils.makeScaleAnimation(this.like, .95, 200, true, 0);
        TweenUtils.fadeOut(obj1, Phaser.Timer.SECOND * .25, Phaser.Timer.SECOND * .5);
        TweenUtils.fadeIn(obj2, Phaser.Timer.SECOND * .25, Phaser.Timer.SECOND * .5);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 4, this.nextGirls, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg1) this.bg1.destroy(true);
        if (this.bg2) this.bg2.destroy(true);
        if (this.bg3) this.bg3.destroy(true);
        if (this.like) this.like.destroy(true);

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

