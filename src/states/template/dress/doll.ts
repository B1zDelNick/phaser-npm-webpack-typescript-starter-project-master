import {GameConfig} from '../../../config/game.config';

import {DollLayer} from './doll.layer';
import {TweenUtils} from '../../../utils/tween.utils';
import {isNull, isUndefined} from 'util';

export class Doll {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private layers: Array<DollLayer> = [];
    private dependencies: Map<string, string> = new Map();

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

    layer(x: number, y: number, name: string, asset: string, frameClass: any, prefix?: string, defaultFrame?: string, removable: boolean = false, strictIndexes?: number[], dependsOn?: string[]): Doll {
        this.layers[name] = new DollLayer(this.container, x, y, asset, frameClass, prefix, defaultFrame, removable, strictIndexes);
        if (dependsOn) {
            for (let dep of dependsOn) {
                this.dependencies.set(dep, name);
            }
        }
        return this;
    }

    on(item: string, index: number, ...off: string[]): boolean {
        for (let toOff of off) {
            if (this.layers[toOff])
                this.layers[toOff].operate(-1);
        }
        if (!this.layers[item]) return false;
        const result = this.layers[item].operate(index);
        if (this.dependencies.has(item)) {
            if (this.layers[item].isEmpty) {
                this.layers[this.dependencies.get(item)].setSecondaryState(false);
            }
            else {
                this.layers[this.dependencies.get(item)].setSecondaryState(true);
            }
        }
        return result;
    }

    off(item: string): void {
        this.layers[item].remove();
    }

    setListeners(context: any, callback: Function, overHandler?: Function, outHandler?: Function): Doll {
        this.container.inputEnableChildren = true;
        this.container.onChildInputDown.add(callback, context);
        if (overHandler) this.container.onChildInputOver.add(overHandler, context);
        if (outHandler) this.container.onChildInputOut.add(outHandler, context);
        return this;
    }

    disableListeners(): Doll {
        this.container.inputEnableChildren = false;
        for (let sp of this.container.children) {
            if (sp instanceof Phaser.Sprite) {
                (sp as Phaser.Sprite).inputEnabled = false;
            }
        }
        return this;
    }

    enableListeners(): Doll {
        this.container.inputEnableChildren = true;
        for (let sp of this.container.children) {
            if (sp instanceof Phaser.Sprite) {
                (sp as Phaser.Sprite).inputEnabled = true;
            }
        }
        return this;
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