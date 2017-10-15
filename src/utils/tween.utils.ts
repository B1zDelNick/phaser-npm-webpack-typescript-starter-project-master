import {GameConfig} from '../config/game.config';
import {isNull, isUndefined} from 'util';

export class TweenUtils {

    public static rotate(
        target: any, amount: number, duration: number = 1000, delay: number = 0, repeat: number = 0, loop: boolean = false,
        easing: Function = Phaser.Easing.Linear.None, callBack?: Function, context?: any): Phaser.Tween {

        if (repeat === -1) repeat = 99999;
        const game = GameConfig.GAME;
        return game.add.tween(target).to({ angle: amount }, duration, easing, true, delay, repeat, loop);
    }

    public static fadeOut(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        const tween = game.add.tween(target).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static fadeIn(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        const tween = game.add.tween(target).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static fadeAndScaleIn(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;
        const tw1 = game.add.tween(target).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
        const tw2 = game.add.tween(target.scale).to({ x: 1, y: 1 }, duration * 2, Phaser.Easing.Elastic.Out, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tw2.onComplete.addOnce(callBack, context);
        return [
            tw1, tw2
        ];
    }

    public static fadeAndScaleOut(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;
        return [
            game.add.tween(target).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true, delay),
            game.add.tween(target.scale).to({ x: 0, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay)
        ];
    }

    public static customFadeAndScaleIn(target: any, alpha: number = 1, scale: number = 1, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;
        return [
            game.add.tween(target).to({ alpha: alpha }, duration, Phaser.Easing.Linear.None, true, delay),
            game.add.tween(target.scale).to({ x: scale, y: scale }, duration * 2, Phaser.Easing.Elastic.Out, true, delay)
        ];
    }

    public static slideIn(target: any, x: number, duration: number = 1000, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        const tween = game.add.tween(target).to({ x: x }, duration, Phaser.Easing.Circular.Out, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }

    public static slideOut(target: any, x: number, duration: number = 1000, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        const tween = game.add.tween(target).to({ x: x }, duration, Phaser.Easing.Circular.In, true, delay);
        if (!isNull(callBack) && !isUndefined(callBack))
            tween.onComplete.addOnce(callBack, context);
        return tween;
    }
}