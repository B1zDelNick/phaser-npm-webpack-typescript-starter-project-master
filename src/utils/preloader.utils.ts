import * as Assets from '../assets';
import {GameConfig} from '../config/game.config';

export class PreloaderUtils {
    public static preloadStartState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.image(
            Assets.Images.ImagesBg.getName(),
            Assets.Images.ImagesBg.getJPG());
    }
}