import {LaserType} from '../states/spec-effects/laser/enum.laser';
import {ILaser} from '../states/spec-effects/laser/i.laser';
import {DoubleLaser} from '../states/spec-effects/laser/double.laser';
import {FilterUtils} from './filter.utils';
import {GameConfig} from '../config/game.config';

export class EffectUtils {

    public static makeLaser(type: LaserType): ILaser {
        let laser: ILaser;
        switch (type) {
            case LaserType.DOUBLE_LASER: {
                laser = new DoubleLaser();
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
}