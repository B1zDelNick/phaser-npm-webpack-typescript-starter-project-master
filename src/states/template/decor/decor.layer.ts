import {GameConfig} from '../../../config/game.config';
import {DecorBackground} from './decor.background';
import {TweenUtils} from '../../../utils/tween.utils';

export class DecorLayer {

    private owner: DecorBackground = null;
    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private sprites: Phaser.Sprite[] = [];
    private current: number = -1;

    constructor(owner: DecorBackground, container: Phaser.Group) {
        this.owner = owner;
        this.game = GameConfig.GAME;
        this.container = container;
    }

    item(x: number, y: number, asset: string, frame?: any): DecorLayer {
        this.sprites.push(this.game.add.sprite(x, y, asset, frame, this.container));
        return this;
    }

    next(): void {
        if (this.current !== this.sprites.length) {
            this.game.tweens.removeFrom(this.sprites[this.current]);
            TweenUtils.fadeOut(this.sprites[this.current]);
        }

        this.current++;
        if (this.current > this.sprites.length) this.current = 0;

        if (this.current !== this.sprites.length) {
            TweenUtils.fadeIn(this.sprites[this.current]);
        }
    }

    build(): DecorBackground {
        for (let sp of this.sprites) {
            sp.alpha = 0;
        }
        this.current = this.sprites.length;
        return this.owner;
    }

    dispose(): void {
        for (let sp of this.sprites) {
            sp.destroy(true);
        }
    }
}