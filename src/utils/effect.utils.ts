import {LaserType} from '../states/spec-effects/laser/enum.laser';
import {ILaser} from '../states/spec-effects/laser/i.laser';
import {DoubleLaser} from '../states/spec-effects/laser/double.laser';

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
}