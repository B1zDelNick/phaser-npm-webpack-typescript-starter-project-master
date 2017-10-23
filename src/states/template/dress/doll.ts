import {GameConfig} from '../../../config/game.config';

import {DollLayer} from './doll.layer';
import {TweenUtils} from '../../../utils/tween.utils';
import {isNull, isUndefined} from 'util';

export class Doll {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private layers: Array<DollLayer> = [];

    constructor(state: Phaser.State, x: number, y: number, scaleX: number = 1, scaleY: number = -1) {
        this.game = GameConfig.GAME;

        this.container = this.game.add.group();
        this.container.x = x;
        this.container.y = y;
        this.container.scale.setTo(scaleX, scaleY === -1 ? scaleX : scaleY);
    }

    hide(force: boolean = false) {
        TweenUtils.fadeOut(this.container, force ? 1 : 500);
    }

    show(force: boolean = false) {
        TweenUtils.fadeIn(this.container, force ? 1 : 500);
    }

    layer(x: number, y: number, name: string, asset: string, frameClass: any, prefix?: string, defaultFrame?: string, removable: boolean = false, strictIndexes?: number[]): Doll {
        this.layers[name] = new DollLayer(this.container, x, y, asset, frameClass, prefix, defaultFrame, removable, strictIndexes);
        return this;
    }

    on(item: string, index: number, ...off: string[]): boolean {
        for (let toOff of off) {
            if (this.layers[toOff])
                this.layers[toOff].operate(-1);
        }
        if (!this.layers[item]) return false;
        return this.layers[item].operate(index);
    }

    off(item: string): void {
        this.layers[item].remove();
    }

    setPosition(x: number, y: number): void {
        this.container.position.setTo(x, y);
    }

    setScale(val: number, val2?: number): void {
        if (isUndefined(val2) || isNull(val2))
            this.container.scale.setTo(val);
        else
            this.container.scale.setTo(val, val2);
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