import * as Assets from '../assets';
import {GameConfig} from '../config/game.config';
import {ImageUtils} from './images/image.utils';

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
        this.soundAdditionalLoads();
    }

    public static preloadSaver(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesSaver') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesSaver').getName(),
                ImageUtils.getAtlasClass('AtlasesSaver').getPNG(),
                ImageUtils.getAtlasClass('AtlasesSaver').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Saver graphics was found.`);
        }
    }

    public static preloadEffects(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesEffects') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesEffects').getName(),
                ImageUtils.getAtlasClass('AtlasesEffects').getPNG(),
                ImageUtils.getAtlasClass('AtlasesEffects').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Effects graphics was found.`);
        }
    }

    public static preloadStartState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStartState') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStartState').getName(),
                ImageUtils.getAtlasClass('AtlasesStartState').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStartState').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default StartState graphics was found.`);
        }
        this.startStateAdditionalLoads();
    }

    public static preloadComixState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesComixState') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesComixState').getName(),
                ImageUtils.getAtlasClass('AtlasesComixState').getPNG(),
                ImageUtils.getAtlasClass('AtlasesComixState').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Comix State graphics was found.`);
        }
    }

    public static preloadSelectState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesSelectState') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesSelectState').getName(),
                ImageUtils.getAtlasClass('AtlasesSelectState').getPNG(),
                ImageUtils.getAtlasClass('AtlasesSelectState').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Select State graphics was found.`);
        }
    }

    public static preloadDressState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesDressState') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesDressState').getName(),
                ImageUtils.getAtlasClass('AtlasesDressState').getPNG(),
                ImageUtils.getAtlasClass('AtlasesDressState').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Dress State graphics was found.`);
        }
    }

    public static preloadFinalState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesFinalState') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesFinalState').getName(),
                ImageUtils.getAtlasClass('AtlasesFinalState').getPNG(),
                ImageUtils.getAtlasClass('AtlasesFinalState').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Final State graphics was found.`);
        }
    }

    /** ------------------------------------------------------------------------
     * Aditional loads for extending tries of default predefined assets loading
    ------------------------------------------------------------------------- */

    private static startStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
    }

    private static soundAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
    }

    private static dressStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
    }
}