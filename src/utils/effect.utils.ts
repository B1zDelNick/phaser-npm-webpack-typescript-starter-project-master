import {LaserType} from '../states/spec-effects/laser/enum.laser';
import {ILaser} from '../states/spec-effects/laser/i.laser';
import {DoubleLaser} from '../states/spec-effects/laser/double.laser';
import {FilterUtils} from './filter.utils';
import {GameConfig} from '../config/game.config';
import {TripleLaser} from '../states/spec-effects/laser/triple.laser';

export class EffectUtils {

    public static makeLaser(type: LaserType): ILaser {
        let laser: ILaser;
        switch (type) {
            case LaserType.DOUBLE_LASER: {
                laser = new DoubleLaser();
                break;
            }
            case LaserType.TRIPLE_LASER: {
                laser = new TripleLaser();
                break;
            }
        }
        return laser;
    }

    public static makeGlowAnimation(color: number = 0xffffff, period: number = 1000, loop: boolean = true, dist: number = 350): Phaser.Filter {
        const f = FilterUtils.makeFilter(color, dist, dist);
        (f as any).outerStrength = 0;
        (f as any).innerStrength = 0;
        const game = GameConfig.GAME;
        game.add.tween(f).to({ outerStrength: 3, innerStrength: 2 },
            period, Phaser.Easing.Linear.None, true, 0, 99990)
            .yoyo(loop);
        return f;
    }

    public static makeLightGlowAnimation(color: number = 0xffffff, period: number = 1000, loop: boolean = true, dist: number = 350): Phaser.Filter {
        const f = FilterUtils.makeFilter(color, dist, dist);
        (f as any).outerStrength = 0;
        (f as any).innerStrength = 0;
        const game = GameConfig.GAME;
        game.add.tween(f).to({ outerStrength: 2, innerStrength: 1 },
            period, Phaser.Easing.Linear.None, true, 0, 99990)
            .yoyo(loop);
        return f;
    }

    public static makeScaleAnimation(target: any, scale: number = 1.05, period: number = 1000, loop: boolean = true, dist: number = 350): Phaser.Tween {
        const game = GameConfig.GAME;
        return game.add.tween(target.scale).to({ x: scale, y: scale },
            period, Phaser.Easing.Linear.None, true, 0, 99999)
            .yoyo(loop);
    }

    public static makeLightRotateAnimation(sprite: any): void {
        const game = GameConfig.GAME;
        const _tween1 = game.add.tween(sprite).to({ angle: 10 }, 400, Phaser.Easing.Linear.None, true);
        const _tween2 = game.add.tween(sprite).to({ angle: -10 }, 800, Phaser.Easing.Linear.None, false);
        const _tween3 = game.add.tween(sprite).to({ angle: 0 }, 400, Phaser.Easing.Linear.None, false);
        _tween1.chain(_tween2);
        _tween2.chain(_tween3);
        _tween3.chain(_tween1);
    }

    public static makeNeonAnimation(sprite: any): void {
        const game = GameConfig.GAME;
        const _tween1 = game.add.tween(sprite).to({ alpha: .25 }, 750, Phaser.Easing.Linear.None, true);
        const _tween2 = game.add.tween(sprite).to({ alpha: 1 }, 750, Phaser.Easing.Bounce.InOut, false);
        const _tween3 = game.add.tween(sprite).to({ alpha: .05 }, 200, Phaser.Easing.Linear.None, false, 500);
        const _tween4 = game.add.tween(sprite).to({ alpha: 1 }, 1250, Phaser.Easing.Bounce.InOut, false);
        _tween1.chain(_tween2);
        _tween2.chain(_tween3);
        _tween3.chain(_tween4);
        _tween4.chain(_tween1);
    }
}