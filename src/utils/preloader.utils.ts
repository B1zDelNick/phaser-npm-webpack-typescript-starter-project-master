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

    public static preloadDress1State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDress1State').getName(),
            ImageUtils.getAtlasClass('AtlasesDress1State').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDress1State').getJSONArray());
        this.dress1StateAdditionalLoads();
    }

    public static preloadDress2State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDress2State').getName(),
            ImageUtils.getAtlasClass('AtlasesDress2State').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDress2State').getJSONArray());
        this.dress2StateAdditionalLoads();
    }

    public static preloadDress3State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDress3State').getName(),
            ImageUtils.getAtlasClass('AtlasesDress3State').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDress3State').getJSONArray());
        this.dress3StateAdditionalLoads();
    }

    public static preloadFinalState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesFinalState').getName(),
            ImageUtils.getAtlasClass('AtlasesFinalState').getPNG(),
            ImageUtils.getAtlasClass('AtlasesFinalState').getJSONArray());
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
        game.load.audio(
            Assets.Audio['AudioSalsa'].getName(),
            Assets.Audio['AudioSalsa'].getMP3(),
            true);
        game.load.audio(
            Assets.Audio['AudioValz'].getName(),
            Assets.Audio['AudioValz'].getMP3(),
            true);
        game.load.audio(
            Assets.Audio['AudioHipHop'].getName(),
            Assets.Audio['AudioHipHop'].getMP3(),
            true);
    }

    private static dress1StateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollAriel').getName(),
            ImageUtils.getAtlasClass('AtlasesDollAriel').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollAriel').getJSONArray());
    }

    private static dress2StateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollCindy').getName(),
            ImageUtils.getAtlasClass('AtlasesDollCindy').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollCindy').getJSONArray());
    }

    private static dress3StateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
            ImageUtils.getAtlasClass('AtlasesDollAvrora').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollAvrora').getJSONArray());
    }
}