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
}