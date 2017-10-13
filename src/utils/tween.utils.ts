import {GameConfig} from '../config/game.config';

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
            return game.add.tween(target).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
    }

    public static fadeIn(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween {
        const game = GameConfig.GAME;
        return game.add.tween(target).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
    }

    public static fadeAndScaleIn(target: any, duration: number = 500, delay: number = 0, callBack?: Function, context?: any): Phaser.Tween[] {
        const game = GameConfig.GAME;
        return [
            game.add.tween(target).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay),
            game.add.tween(target.scale).to({ x: 1, y: 1 }, duration * 2, Phaser.Easing.Elastic.Out, true, delay)
        ];
    }
}