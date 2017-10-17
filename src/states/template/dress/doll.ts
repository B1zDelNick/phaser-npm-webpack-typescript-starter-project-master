import {GameConfig} from '../../../config/game.config';

import {DollLayer} from './doll.layer';
import {TweenUtils} from '../../../utils/tween.utils';

export class Doll {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private layers: Array<DollLayer> = [];

    constructor(state: Phaser.State, x: number, y: number, scale: number = 1, namePrefix: string = '') {
        this.game = GameConfig.GAME;

        this.container = this.game.add.group();
        this.container.x = x;
        this.container.y = y;
        this.container.scale.setTo(scale);
    }

    hide(force: boolean = false) {
        TweenUtils.fadeOut(this.container, force ? 1 : 500);
    }

    show(force: boolean = false) {
        TweenUtils.fadeIn(this.container, force ? 1 : 500);
    }

    layer(x: number, y: number, name: string, asset: string, frameClass: any, prefix?: string, defaultFrame?: string, removable: boolean = false): Doll {
        this.layers[name] = new DollLayer(this.container, x, y, asset, frameClass, prefix, defaultFrame, removable);
        return this;
    }

    on(item: string, index: number, ...off: string[]): boolean {
        for (let toOff of off) {
            if (this.layers[toOff])
                this.layers[toOff].operate(-1);
        }
        return this.layers[item].operate(index);
    }

    setPosition(x: number, y: number): void {
        this.container.position.setTo(x, y);
    }

    setScale(val: number): void {
        this.container.scale.setTo(val);
    }

    getBody(): Phaser.Group {
        return this.container;
    }

    extract(): Doll {
        this.game.world.remove(this.container);
        return this;
    }

    insert(): void {
        this.game.add.existing(this.container);
    }

    dispose(): void {
        for (let layer of this.layers) {
            layer.dispose();
        }
        this.container.destroy(true);
    }
}