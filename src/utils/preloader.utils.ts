import * as Assets from '../assets';
import {GameConfig} from '../config/game.config';

export class PreloaderUtils {
    public static preloadStartState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.image(
            Assets.Images.ImagesBg.getName(),
            Assets.Images.ImagesBg.getJPG());
        game.load.image(
            Assets.Images.ImagesPart1.getName(),
            Assets.Images.ImagesPart1.getPNG());
        game.load.image(
            Assets.Images.ImagesPart2.getName(),
            Assets.Images.ImagesPart2.getPNG());
        game.load.image(
            Assets.Images.ImagesVs.getName(),
            Assets.Images.ImagesVs.getPNG());
    }

    public static preloadComixState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.image(
            Assets.Images.ImagesBg3.getName(),
            Assets.Images.ImagesBg3.getJPG());
        game.load.atlasJSONArray(
            Assets.Atlases.AtlasesComixState.getName(),
            Assets.Atlases.AtlasesComixState.getPNG(),
            Assets.Atlases.AtlasesComixState.getJSONArray());
    }
}