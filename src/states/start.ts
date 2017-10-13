import * as Assets from '../assets';
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
import {Atlases} from '../assets';

export default class Start extends Phaser.State {

    private NEXT = 'Comix';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private laser: ILaser = null;
    private title: Phaser.Sprite = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private girl3: Phaser.Sprite = null;

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
        this.game.add.sprite(0, 0,
            Assets.Atlases.AtlasesStartState.getName(),
            Assets.Atlases.AtlasesStartState.Frames.Bg);

        this.laser = EffectUtils.makeLaser(LaserType.DOUBLE_LASER);
        this.laser.init(Assets.Atlases.AtlasesEffects.getName(), Assets.Atlases.AtlasesEffects.Frames.Light.toString());
        this.laser.start();

        this.girl1 = this.game.add.sprite(274, 11,
            Assets.Atlases.AtlasesStartState.getName(),
            Assets.Atlases.AtlasesStartState.Frames.Gr1);
        this.girl2 = this.game.add.sprite(47, 53,
            Assets.Atlases.AtlasesStartState.getName(),
            Assets.Atlases.AtlasesStartState.Frames.Gr2);
        this.girl3 = this.game.add.sprite(432, 47,
            Assets.Atlases.AtlasesStartState.getName(),
            Assets.Atlases.AtlasesStartState.Frames.Gr3);

        this.girl1.alpha = 0;
        this.girl2.alpha = 0;
        this.girl3.alpha = 0;

        this.title = this.game.add.sprite(171, 257 - 720, Assets.Atlases.AtlasesTitle.getName());
        this.title.animations.add('neon', [
                Assets.Atlases.AtlasesTitle.Frames.Title001,
                Assets.Atlases.AtlasesTitle.Frames.Title002,
                Assets.Atlases.AtlasesTitle.Frames.Title003,
                Assets.Atlases.AtlasesTitle.Frames.Title004,
                Assets.Atlases.AtlasesTitle.Frames.Title005,
                Assets.Atlases.AtlasesTitle.Frames.Title006,
                Assets.Atlases.AtlasesTitle.Frames.Title007,
                Assets.Atlases.AtlasesTitle.Frames.Title008,
                Assets.Atlases.AtlasesTitle.Frames.Title009,
            ]
        );
        this.title.animations.play('neon', 10, true);

        // GUI Buttons
        this.gui.addGui(false);
        const playBtn = this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 189, 720 - 182,
            Assets.Atlases.AtlasesStartState.getName(),
            Assets.Atlases.AtlasesStartState.Frames.EMore.toString(),
            GuiUtils.addOverScaleHandler,
            GuiUtils.addOutScaleHandler
        );
        moreBtn.filters = [EffectUtils.makeGlowAnimation(0xff33ff)];
        playBtn.position.setTo(playBtn.x - 250, playBtn.y + 250);

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        }
        // ONLY FOR START STATE !!!!!!!!!!!!!!!!!
        this.game.camera.flash(0x000000, 1000);

        // Animations goes here
        new Animation()
            .add(this.girl1, { alpha: 1 }, Phaser.Timer.SECOND * 0.5, Phaser.Timer.SECOND * 1)
            .add(this.girl2, { alpha: 1 }, Phaser.Timer.SECOND * 0.5, Phaser.Timer.SECOND * 1.5)
            .add(this.girl3, { alpha: 1 }, Phaser.Timer.SECOND * 0.5, Phaser.Timer.SECOND * 2)
            .add(this.title, { y: 257 }, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * 2.5, Phaser.Easing.Bounce.Out)
            .add(playBtn,
                { x: playBtn.x + 250, y: playBtn.y - 250 },
                Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 4, Phaser.Easing.Circular.Out)
            .animate();

        // Assets Managment starts here
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadComixState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        if (this.saver) {
            this.saver.setOnOutCallback(() => {
                this.game.time.events.removeAll();
                this.game.tweens.removeAll();
                this.reallyGoNextState(true);
            });
            this.saver.fadeOut();
        } else {
            const blocker = this.game.add.graphics(0, 0);
            blocker.beginFill(0);
            blocker.drawRect(0, 0, 960, 720);
            blocker.inputEnabled = true;
            blocker.alpha = 0;
            this.game.camera.onFadeComplete.addOnce(() => {
                this.game.time.events.removeAll();
                this.game.tweens.removeAll();
                this.game.camera.fade(0x000000, 1, true, 0);
                blocker.alpha = .85;
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
                const preloadFrameSprite = this.game.add.sprite(0, this.gui == null ? this.game.world.centerY : 595,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Progressbar1Fgc);
                const preloadBarSprite = this.game.add.sprite(0, this.gui == null ? this.game.world.centerY : 595,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Progressbar2Fgc);
                preloadBarSprite.x = preloadFrameSprite.x = this.game.world.centerX - preloadFrameSprite.width / 2;
                this.game.load.setPreloadSprite(preloadBarSprite);
            }
            this.game.time.events.add(Phaser.Timer.SECOND *  .25, this.reallyGoNextState, this);
        }
    }
}

