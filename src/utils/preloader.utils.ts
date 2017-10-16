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
        if (Assets.Atlases['AtlasesSaver' + GameConfig.ASSET_SIZE] != null) {
            game.load.atlasJSONArray(
                Assets.Atlases['AtlasesSaver' + GameConfig.ASSET_SIZE].getName(),
                Assets.Atlases['AtlasesSaver' + GameConfig.ASSET_SIZE].getPNG(),
                Assets.Atlases['AtlasesSaver' + GameConfig.ASSET_SIZE].getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Saver graphics was found.`);
        }
    }

    public static preloadEffects(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (Assets.Atlases['AtlasesEffects' + GameConfig.ASSET_SIZE] != null) {
            game.load.atlasJSONArray(
                Assets.Atlases['AtlasesEffects' + GameConfig.ASSET_SIZE].getName(),
                Assets.Atlases['AtlasesEffects' + GameConfig.ASSET_SIZE].getPNG(),
                Assets.Atlases['AtlasesEffects' + GameConfig.ASSET_SIZE].getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Effects graphics was found.`);
        }
    }

    public static preloadStartState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (Assets.Atlases['AtlasesStartState' + GameConfig.ASSET_SIZE] != null) {
            game.load.atlasJSONArray(
                Assets.Atlases['AtlasesStartState' + GameConfig.ASSET_SIZE].getName(),
                Assets.Atlases['AtlasesStartState' + GameConfig.ASSET_SIZE].getPNG(),
                Assets.Atlases['AtlasesStartState' + GameConfig.ASSET_SIZE].getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default StartState graphics was found.`);
        }
        this.startStateAdditionalLoads();
    }

    public static preloadComixState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (Assets.Atlases['AtlasesComixState' + GameConfig.ASSET_SIZE] != null) {
            game.load.atlasJSONArray(
                Assets.Atlases['AtlasesComixState' + GameConfig.ASSET_SIZE].getName(),
                Assets.Atlases['AtlasesComixState' + GameConfig.ASSET_SIZE].getPNG(),
                Assets.Atlases['AtlasesComixState' + GameConfig.ASSET_SIZE].getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Comix State graphics was found.`);
        }
    }

    public static preloadDress1State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesDress1State' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesDress1State' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesDress1State' + GameConfig.ASSET_SIZE].getJSONArray());
        this.dressStateAdditionalLoads();
    }

    public static preloadDress2State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesDress2State' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesDress2State' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesDress2State' + GameConfig.ASSET_SIZE].getJSONArray());
    }

    public static preloadDress3State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesDress3State' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesDress3State' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesDress3State' + GameConfig.ASSET_SIZE].getJSONArray());
    }

    public static preloadFinalState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesFinalState' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesFinalState' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesFinalState' + GameConfig.ASSET_SIZE].getJSONArray());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsSign238469' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsSign238469' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsSign238469' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsSign238469' + GameConfig.ASSET_SIZE].getFrameHeight());
    }

    /** ------------------------------------------------------------------------
     * Aditional loads for extending tries of default predefined assets loading
    ------------------------------------------------------------------------- */

    private static startStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesTitle' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesTitle' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesTitle' + GameConfig.ASSET_SIZE].getJSONArray());
    }

    private static dressStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesDollAnna' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesDollAnna' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesDollAnna' + GameConfig.ASSET_SIZE].getJSONArray());
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesDollElza' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesDollElza' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesDollElza' + GameConfig.ASSET_SIZE].getJSONArray());
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesDollElza2' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesDollElza2' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesDollElza2' + GameConfig.ASSET_SIZE].getJSONArray());
    }
}