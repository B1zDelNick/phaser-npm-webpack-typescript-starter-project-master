import {GameConfig} from '../../../config/game.config';
import {DecorLayer} from './decor.layer';
export class DecorBackground {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private sprites: Phaser.Sprite[] = [];
    private layers: DecorLayer[] = [];

    constructor(x: number = 0, y: number = 0) {
        this.game = GameConfig.GAME;
        this.container = this.game.add.group();
        this.container.position.setTo(x, y);
    }

    next(layerName: string): void {
        this.layers[layerName].next();
    }

    extract(): DecorBackground {
        this.game.world.remove(this.container);
        return this;
    }

    insert(): void {
        this.game.add.existing(this.container);
    }

    setPosition(x: number, y: number): void {
        this.container.position.setTo(x, y);
    }

    setScale(val: number): void {
        this.container.scale.setTo(val);
    }

    sprite(x: number, y: number, asset: string, frame?: any): DecorBackground {
        this.sprites.push(this.game.add.sprite(x, y, asset, frame, this.container));
        return this;
    }

    layer(name: string, allowEmpty: boolean = true): DecorLayer {
        this.layers[name] = new DecorLayer(this, this.container, allowEmpty);
        return this.layers[name];
    }

    dispose(): void {
        for (let sp of this.sprites) {
            sp.destroy(true);
        }
        for (let lr of this.layers) {
            lr.dispose();
        }
        this.container.destroy(true);
    }
}