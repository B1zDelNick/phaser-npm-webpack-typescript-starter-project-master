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

export default class Comix extends Phaser.State {

    private NEXT = 'Dress1';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private laser: ILaser = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private girl3: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;

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
        this.game.add.sprite(0, 0,
            Assets.Atlases.AtlasesStartState.getName(),
            Assets.Atlases.AtlasesStartState.Frames.Bg);

        this.laser = EffectUtils.makeLaser(LaserType.DOUBLE_LASER);
        this.laser.init(Assets.Atlases.AtlasesEffects.getName(), Assets.Atlases.AtlasesEffects.Frames.Light.toString());
        this.laser.start();

        this.girl1 = this.game.add.sprite(94 - 700, 6,
            Assets.Atlases.AtlasesComixState.getName(),
            Assets.Atlases.AtlasesComixState.Frames.Gr4);
        this.girl2 = this.game.add.sprite(368 + 700, 41,
            Assets.Atlases.AtlasesComixState.getName(),
            Assets.Atlases.AtlasesComixState.Frames.Gr5);
        this.girl3 = this.game.add.sprite(578 + 700, 41,
            Assets.Atlases.AtlasesComixState.getName(),
            Assets.Atlases.AtlasesComixState.Frames.Gr6);
        this.cloud1 = this.game.add.sprite(12, 161,
            Assets.Atlases.AtlasesComixState.getName(),
            Assets.Atlases.AtlasesComixState.Frames.Cl1);
        this.cloud2 = this.game.add.sprite(451, 165,
            Assets.Atlases.AtlasesComixState.getName(),
            Assets.Atlases.AtlasesComixState.Frames.Cl2);

        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;

        // GUI Buttons
        this.gui.addGui();
        const playBtn = this.gui.addPlayBtn(this.nextState);
        this.gui.addExtraBtn(115, 593, Assets.Atlases.AtlasesComixState.getName(), Assets.Atlases.AtlasesComixState.Frames.Skip, this.nextState);
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
        new Animation()
            .add(this.girl1, { x: 94 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.Out)
            .add(this.cloud1, { alpha: 1 }, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2)
            .add(this.girl2, { x: 368 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 3.5, Phaser.Easing.Circular.Out)
            .add(this.girl3, { x: 578 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 4, Phaser.Easing.Circular.Out)
            .add(this.cloud2, { alpha: 1 }, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 5)
            .add(playBtn, { alpha: 1 }, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 5.5)
            .add(playBtn.scale, { x: 1, y: 1 }, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 5.5, Phaser.Easing.Elastic.Out)
            .animate();

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

        this.laser.dispose();
        this.girl1.destroy(true);
        this.girl2.destroy(true);
        this.girl3.destroy(true);
        this.cloud1.destroy(true);
        this.cloud2.destroy(true);

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
                const preloadFrameSprite = this.game.add.sprite(0, 595,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Progressbar1Fgc);
                const preloadBarSprite = this.game.add.sprite(0, 595,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Progressbar2Fgc);
                preloadBarSprite.x = preloadFrameSprite.x = this.game.world.centerX - preloadFrameSprite.width / 2;
                this.game.load.setPreloadSprite(preloadBarSprite);
            }
            this.game.time.events.add(Phaser.Timer.SECOND *  .25, this.reallyGoNextState, this);
        }
    }
}

