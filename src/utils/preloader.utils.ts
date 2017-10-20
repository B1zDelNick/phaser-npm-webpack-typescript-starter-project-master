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
        if (ImageUtils.getAtlasClass('AtlasesStateStart') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateStart').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default StartState graphics was found.`);
        }
        this.startStateAdditionalLoads();
    }

    public static preloadComixState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateComix') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateComix').getName(),
                ImageUtils.getAtlasClass('AtlasesStateComix').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateComix').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Comix State graphics was found.`);
        }
        this.comixStateAdditionalLoads();
    }

    public static preloadSelectState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateSelect') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
                ImageUtils.getAtlasClass('AtlasesStateSelect').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateSelect').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Select State graphics was found.`);
        }
        this.selectStateAdditionalLoads();
    }

    public static preloadDress1State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateDress1') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Dress1 State graphics was found.`);
        }
        this.dress1StateAdditionalLoads();
    }

    public static preloadDress2State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateDress2') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateDress2').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Dress2 State graphics was found.`);
        }
        this.dress2StateAdditionalLoads();
    }

    public static preloadDress3State(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateDress3') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateDress3').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Dress3 State graphics was found.`);
        }
        this.dress3StateAdditionalLoads();
    }

    public static preloadDecorState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateDecor') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateDecor').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateDecor').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Decor State graphics was found.`);
        }
        this.decorStateAdditionalLoads();
    }

    public static preloadPosterState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStatePoster') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStatePoster').getName(),
                ImageUtils.getAtlasClass('AtlasesStatePoster').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStatePoster').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Poster State graphics was found.`);
        }
        this.posterStateAdditionalLoads();
    }

    public static preloadResultState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesStateResult').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult').getPNG(),
            ImageUtils.getAtlasClass('AtlasesStateResult').getJSONArray());
    }

    public static preloadFinalState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateFinal') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').getJSONArray());
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
        game.load.image(
            ImageUtils.getImageClass('ImagesBg').getName(),
            ImageUtils.getImageClass('ImagesBg').getJPG());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1441447').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1441447').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1441447').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1441447').getFrameHeight());
    }

    private static comixStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        /*game.load.image(
            ImageUtils.getImageClass('ImagesBg').getName(),
            ImageUtils.getImageClass('ImagesBg').getJPG());*/
    }

    private static selectStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
         ImageUtils.getImageClass('ImagesBg2').getName(),
         ImageUtils.getImageClass('ImagesBg2').getJPG());
    }

    private static soundAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
    }

    private static decorStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        /*game.load.image(
            ImageUtils.getImageClass('ImagesBg4').getName(),
            ImageUtils.getImageClass('ImagesBg4').getJPG());*/
    }

    private static posterStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
         ImageUtils.getImageClass('ImagesBg3').getName(),
         ImageUtils.getImageClass('ImagesBg3').getJPG());
    }

    private static dress1StateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesBg4').getName(),
            ImageUtils.getImageClass('ImagesBg4').getJPG());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollElza').getName(),
            ImageUtils.getAtlasClass('AtlasesDollElza').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollElza').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollAvrora').getName(),
            ImageUtils.getAtlasClass('AtlasesDollAvrora').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollAvrora').getJSONArray());
    }

    private static dress2StateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesBg5').getName(),
            ImageUtils.getImageClass('ImagesBg5').getJPG());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollBelle').getName(),
            ImageUtils.getAtlasClass('AtlasesDollBelle').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollBelle').getJSONArray());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollBelleBody').getName(),
            ImageUtils.getAtlasClass('AtlasesDollBelleBody').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollBelleBody').getJSONArray());
        game.load.image(
            ImageUtils.getImageClass('ImagesChest').getName(),
            ImageUtils.getImageClass('ImagesChest').getJPG());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsMArrow154825').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsMArrow154825').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsMArrow154825').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsMArrow154825').getFrameHeight());
    }

    private static dress3StateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        /*game.load.image(
            ImageUtils.getImageClass('ImagesBg4').getName(),
            ImageUtils.getImageClass('ImagesBg4').getJPG());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesDollRap').getName(),
            ImageUtils.getAtlasClass('AtlasesDollRap').getPNG(),
            ImageUtils.getAtlasClass('AtlasesDollRap').getJSONArray());*/
    }
}