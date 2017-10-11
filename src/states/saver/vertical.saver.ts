import * as Assets from '../../assets';
import {ISaver} from './i.saver';
import {GameConfig, PublishMode} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {SaverAnimation} from './animation.saver';
import {SaverAnimations} from './enum.saver';

export class VerticalSaver implements ISaver {
    private game: Phaser.Game;
    private state: Phaser.State;

    protected container: Phaser.Group = null;
    protected vs: Phaser.Button = null;
    protected blocker: Phaser.Graphics = null;
    protected part1: Phaser.Sprite = null;
    protected part2: Phaser.Sprite = null;
    protected inAnimation: SaverAnimation = null;
    protected outAnimation: SaverAnimation = null;

    protected static initialized: boolean = true; // TODO to true

    constructor() {
        this.game = GameConfig.GAME;
    }

    init(state: Phaser.State): void {
        this.state = state;
        this.container = this.game.add.group();
        this.container.add(this.blocker = this.game.add.graphics(0, 0));
        this.blocker.beginFill(0, 0);
        this.blocker.drawRect(0, 0, 960, 720);
        this.blocker.inputEnabled = true;
        this.container.add(this.part1 = this.game.make.sprite(0, 0, Assets.Images.ImagesPart1.getName()));
        this.container.add(this.part2 = this.game.make.sprite(0, 360, Assets.Images.ImagesPart2.getName()));
        this.vs = GuiUtils.makeButton(
            this.state, this.container,
            480 - 336, 360 - 159, 1,
            '', Assets.Images.ImagesVs.getName(), [0, 0, 0],
            GameConfig.PUB_MODE === PublishMode.NORMAL ? true : false,
            false, true, GuiUtils.goLinkMainLogo);

        if (VerticalSaver.initialized) {
            this.inAnimation = new SaverAnimation()
                .add(this.blocker, SaverAnimations.TO_E_SLIDE, { x: 960 }, Phaser.Timer.SECOND * 0.0001, Phaser.Timer.SECOND * 1.8)
                .add(this.part1, SaverAnimations.TO_N_SLIDE, { y: -360 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .8, Phaser.Easing.Circular.In)
                .add(this.part2, SaverAnimations.TO_S_SLIDE, { y: 720 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .8, Phaser.Easing.Circular.In)
                .add(this.vs.scale, SaverAnimations.SCALE_OUT, { x: 0, y: 0 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .8, Phaser.Easing.Linear.None)
                .add(this.vs, SaverAnimations.FADE_OUT, { alpha: 0 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .8, Phaser.Easing.Linear.None);
        } else {
            this.blocker.x = 960;
            this.part1.y = -360;
            this.part2.y = 720;
            this.vs.scale.setTo(0);
            this.vs.alpha = 0;

            this.inAnimation = new SaverAnimation();

            VerticalSaver.initialized = true;
        }

        this.outAnimation = new SaverAnimation()
            .add(this.blocker, SaverAnimations.FROM_E_SLIDE, { x: 0 }, Phaser.Timer.SECOND * 0.0001, Phaser.Timer.SECOND * 0)
            .add(this.part1, SaverAnimations.FROM_N_SLIDE, { y: 0 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .3, Phaser.Easing.Circular.Out)
            .add(this.part2, SaverAnimations.FROM_S_SLIDE, { y: 360 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .3, Phaser.Easing.Circular.Out)
            .add(this.vs.scale, SaverAnimations.SCALE_IN, { x: 1, y: 1 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .3, Phaser.Easing.Linear.None)
            .add(this.vs, SaverAnimations.FADE_IN, { alpha: 1 }, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .3, Phaser.Easing.Linear.None);
    }

    fadeIn(callback: Function = null): void {
        this.inAnimation.animate(callback);
    }

    fadeOut(callback: Function = null): void {
        this.outAnimation.animate(callback);
    }

    dispose(): void {
    }
}