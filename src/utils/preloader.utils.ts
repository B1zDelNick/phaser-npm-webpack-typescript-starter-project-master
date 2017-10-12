import * as Assets from '../assets';
import {GameConfig} from '../config/game.config';

export class PreloaderUtils {

    public static preloadMainTheme(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (Assets.Audio['AudioMainTheme'] != null) {
            game.load.audio(
                Assets.Audio['AudioMainTheme'].getName(),
                Assets.Audio['AudioMainTheme'].getMP3(),
                true);
        } else {
            if (DEBUG)
                console.log(`\nNo default Main Theme audio was found.`);
        }
    }

    public static preloadSaver(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (Assets.Atlases['AtlasesSaver'] != null) {
            game.load.atlasJSONArray(
                Assets.Atlases['AtlasesSaver'].getName(),
                Assets.Atlases['AtlasesSaver'].getPNG(),
                Assets.Atlases['AtlasesSaver'].getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Saver graphics was found.`);
        }
    }

    public static preloadEffects(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (Assets.Atlases['AtlasesEffects'] != null) {
            game.load.atlasJSONArray(
                Assets.Atlases['AtlasesEffects'].getName(),
                Assets.Atlases['AtlasesEffects'].getPNG(),
                Assets.Atlases['AtlasesEffects'].getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Effects graphics was found.`);
        }
    }

    public static preloadStartState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (Assets.Atlases['AtlasesStartState'] != null) {
            game.load.atlasJSONArray(
                Assets.Atlases['AtlasesStartState'].getName(),
                Assets.Atlases['AtlasesStartState'].getPNG(),
                Assets.Atlases['AtlasesStartState'].getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default StartState graphics was found.`);
        }
        this.startStateAdditionalLoads();
    }

    public static preloadComixState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (Assets.Atlases['AtlasesComixState'] != null) {
            game.load.atlasJSONArray(
                Assets.Atlases['AtlasesComixState'].getName(),
                Assets.Atlases['AtlasesComixState'].getPNG(),
                Assets.Atlases['AtlasesComixState'].getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Comix State graphics was found.`);
        }
    }

    public static preloadDress1State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.atlasJSONArray(
            Assets.Atlases.AtlasesDress1State.getName(),
            Assets.Atlases.AtlasesDress1State.getPNG(),
            Assets.Atlases.AtlasesDress1State.getJSONArray());
    }

    /** ------------------------------------------------------------------------
     * Aditional loads for extending tries of default predefined assets loading
    ------------------------------------------------------------------------- */

    private static startStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        /*game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsTitle61652610.getName(),
            Assets.Spritesheets.SpritesheetsTitle61652610.getPNG(),
            Assets.Spritesheets.SpritesheetsTitle61652610.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsTitle61652610.getFrameHeight());*/
        game.load.atlasJSONArray(
            Assets.Atlases.AtlasesTitle.getName(),
            Assets.Atlases.AtlasesTitle.getPNG(),
            Assets.Atlases.AtlasesTitle.getJSONArray());
    }
}