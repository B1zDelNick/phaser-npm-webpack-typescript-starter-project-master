import * as Assets from '../../assets';
import {IPreloader} from './i.preloader';
import {GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';

export class FreeGamesCasualPreloader implements IPreloader {

    game: Phaser.Game;
    state: Phaser.State;

    private preloadBarSprite: Phaser.Sprite = null;
    private preloadFrameSprite: Phaser.Sprite = null;
    private playButton: Phaser.Button = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private btn5: Phaser.Button = null;
    private logo: Phaser.Button = null;
    private guiContainer: Phaser.Group = null;
    private glowEmitter: Phaser.Particles.Arcade.Emitter = null;
    private isHover: boolean = false;

    constructor(state: Phaser.State) {
        this.game = GameConfig.GAME;
        this.state = state;
    }

    public preload(): void {
        /** BG */
        this.game.add.sprite(0, 0, Assets.Images.ImagesPrerollFgc.getName());

        /**
         * Preloader Progress Bar
         */

        this.preloadFrameSprite = this.game.add.sprite(0, 595,
            Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
            Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Progressbar1Fgc);
        this.preloadBarSprite = this.game.add.sprite(0, 595,
            Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
            Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Progressbar2Fgc);
        this.preloadBarSprite.x = this.preloadFrameSprite.x = this.game.world.centerX - this.preloadFrameSprite.width / 2;
        this.game.load.setPreloadSprite(this.preloadBarSprite);

        /**
         * Gui buttons
         */

        this.guiContainer = this.game.add.group();

        let hoverHandler = (sprite) => {
            this.isHover = true;
            this.game.tweens.removeFrom(sprite.scale);
            this.game.add.tween(sprite.scale).to({ x: 1.05, y: 1.05 }, 250, Phaser.Easing.Linear.None, true);
        };
        let unhoverHandler = (sprite) => {
            this.isHover = false;
            this.game.tweens.removeFrom(sprite.scale);
            this.game.add.tween(sprite.scale).to({ x: 1, y: 1 }, 250, Phaser.Easing.Linear.None, true);
        };

        this.btn1 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                -200, 96, 1,
                '', Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
                [Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon1Fgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon1Fgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon1Fgc],
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn2 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                -200, 656, 1,
                '', Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
                [Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon2Fgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon2Fgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon2Fgc],
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn3 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                380, 756, 1,
                '', Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
                [Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon3Fgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon3Fgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon3Fgc],
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn4 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                960, 656, 1,
                '', Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
                [Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon4Fgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon4Fgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon4Fgc],
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.btn5 =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                960, 96, 1,
                '', Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
                [Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon5Fgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon5Fgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.Icon5Fgc],
                true, true, true, GuiUtils.goLinkPreloaderCategory, hoverHandler, unhoverHandler);

        this.logo =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                280, 114, 1,
                '', Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
                [Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.LogoFgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.LogoFgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.LogoFgc],
                true, true, true, GuiUtils.goLinkPreloaderLogo, hoverHandler, unhoverHandler);

        this.playButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                350, 558, 1,
                '', Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
                [Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.PlayNormalFgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.PlayOverFgc,
                    Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.PlayNormalFgc],
                true, false, false, this.nextState, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.glowEmitter = this.game.add.emitter(0, 0, 100);
        this.glowEmitter.makeParticles(
            Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
            Assets.Atlases.AtlasesPreloaderAtlasFgc.Frames.ParticleGlowFgc);
        this.glowEmitter.setAlpha(1, 0.3, 3000);
        this.glowEmitter.gravity = new Phaser.Point(0, -10); // -10;
        this.glowEmitter.minParticleScale = 0.5;
        this.glowEmitter.maxParticleScale = 1;

        this.game.add.tween(this.btn1).to({ x: 110, y: 270 }, 800, Phaser.Easing.Circular.Out, true, 0);
        this.game.add.tween(this.btn2).to({ x: 300, y: 380 }, 800, Phaser.Easing.Circular.Out, true, 500);
        this.game.add.tween(this.btn3).to({ x: 480, y: 450 }, 800, Phaser.Easing.Circular.Out, true, 1000);
        this.game.add.tween(this.btn4).to({ x: 660, y: 380 }, 800, Phaser.Easing.Circular.Out, true, 1500);
        this.game.add.tween(this.btn5).to({ x: 850, y: 270 }, 800, Phaser.Easing.Circular.Out, true, 2000);
    }

    public create(): void {
        this.preloadBarSprite.visible = this.preloadFrameSprite.visible = false;
    }

    public update(): void {
        if (this.isHover) {
            this.glowEmitter.x = this.game.input.x;
            this.glowEmitter.y = this.game.input.y;
            this.glowEmitter.start(true, 3000, null, 25);
        }
    }

    public dispose(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        this.glowEmitter.destroy(true);
        this.btn1.destroy(true);
        this.btn2.destroy(true);
        this.btn3.destroy(true);
        this.btn4.destroy(true);
        this.logo.destroy(true);
        this.playButton.destroy(true);
        this.preloadBarSprite.destroy(true);
        this.preloadFrameSprite.destroy(true);
        this.guiContainer.destroy(true);
    }

    public enableButton(): void {
        this.playButton.visible = true;
    }

    private nextState(): void {
        this.game.camera.onFadeComplete.addOnce(() => {
            this.game.state.start('Start'); // , true, false, 'Comix');
        }, this);
        this.game.camera.fade(0x000000, 500, true, .85);
    }
}