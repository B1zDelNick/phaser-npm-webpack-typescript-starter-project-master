import * as Assets from '../assets';
import {GameConfig, PublishMode} from '../config/game.config';

export class BootUtils {

    public static preloadMcg(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (GameConfig.PUB_MODE === PublishMode.GAME_DISTRIBUTIONS) {
            game.load.image(
                Assets.Images['ImagesPreroll2Mcg' + GameConfig.ASSET_SIZE].getName(),
                Assets.Images['ImagesPreroll2Mcg' + GameConfig.ASSET_SIZE].getPNG());
        } else {
            game.load.image(
                Assets.Images['ImagesPrerollMcg' + GameConfig.ASSET_SIZE].getName(),
                Assets.Images['ImagesPrerollMcg' + GameConfig.ASSET_SIZE].getJPG());
        }
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesPreloaderAtlasMcg' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesPreloaderAtlasMcg'].getPNG(),
            Assets.Atlases['AtlasesPreloaderAtlasMcg' + GameConfig.ASSET_SIZE].getJSONArray());
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesGuiMcg' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesGuiMcg' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesGuiMcg' + GameConfig.ASSET_SIZE].getJSONArray());
        game.load.json(
            Assets.JSON.JsonDoll.getName(),
            Assets.JSON.JsonDoll.getJSON());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsPlayMcg1651322' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsPlayMcg1651322' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsPlayMcg1651322' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsPlayMcg1651322' + GameConfig.ASSET_SIZE].getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsReplayMcg1651322' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsReplayMcg1651322' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsReplayMcg1651322' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsReplayMcg1651322' + GameConfig.ASSET_SIZE].getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsLArrMcg1651322' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsLArrMcg1651322' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsLArrMcg1651322' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsLArrMcg1651322' + GameConfig.ASSET_SIZE].getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsDoneMcg1651322' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsDoneMcg1651322' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsDoneMcg1651322' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsDoneMcg1651322' + GameConfig.ASSET_SIZE].getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsMoreMcg1651322' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsMoreMcg1651322' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsMoreMcg1651322' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsMoreMcg1651322' + GameConfig.ASSET_SIZE].getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsMusicMcg1651322' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsMusicMcg1651322' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsMusicMcg1651322' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsMusicMcg1651322' + GameConfig.ASSET_SIZE].getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsMusicOffMcg1651322' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsMusicOffMcg1651322' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsMusicOffMcg1651322' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsMusicOffMcg1651322' + GameConfig.ASSET_SIZE].getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsNextMcg1731322' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsNextMcg1731322' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsNextMcg1731322' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsNextMcg1731322' + GameConfig.ASSET_SIZE].getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsPhotoMcg1651322' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsPhotoMcg1651322' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsPhotoMcg1651322' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsPhotoMcg1651322' + GameConfig.ASSET_SIZE].getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsRArrMcg1651322' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsRArrMcg1651322' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsRArrMcg1651322' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsRArrMcg1651322' + GameConfig.ASSET_SIZE].getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets['SpritesheetsReplayMcg1651322' + GameConfig.ASSET_SIZE].getName(),
            Assets.Spritesheets['SpritesheetsReplayMcg1651322' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Spritesheets['SpritesheetsReplayMcg1651322' + GameConfig.ASSET_SIZE].getFrameWidth(),
            Assets.Spritesheets['SpritesheetsReplayMcg1651322' + GameConfig.ASSET_SIZE].getFrameHeight());
        /*game.load.script(
            Assets.Scripts.ScriptsGlowFilter.getName(),
            Assets.Scripts.ScriptsGlowFilter.getJS());*/
        game.load.script(
            Assets.Scripts.ScriptsSpriter.getName(),
            Assets.Scripts.ScriptsSpriter.getJS());
        this.additionalLoads();
    }

    public static preloadDu(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.image(
            Assets.Images['ImagesPrerollDu' + GameConfig.ASSET_SIZE].getName(),
            Assets.Images['ImagesPrerollDu' + GameConfig.ASSET_SIZE].getJPG());
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesPreloaderAtlasDu' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesPreloaderAtlasDu' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesPreloaderAtlasDu' + GameConfig.ASSET_SIZE].getJSONArray());
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesGuiDu' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesGuiDu' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesGuiDu' + GameConfig.ASSET_SIZE].getJSONArray());
        /*game.load.script(
            Assets.Scripts.ScriptsGlowFilter.getName(),
            Assets.Scripts.ScriptsGlowFilter.getJS());*/
        this.additionalLoads();
    }

    public static preloadFgc(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.image(
            Assets.Images['ImagesPrerollFgc' + GameConfig.ASSET_SIZE].getName(),
            Assets.Images['ImagesPrerollFgc' + GameConfig.ASSET_SIZE].getJPG());
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesPreloaderAtlasFgc' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesPreloaderAtlasFgc' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesPreloaderAtlasFgc' + GameConfig.ASSET_SIZE].getJSONArray());
        game.load.atlasJSONArray(
            Assets.Atlases['AtlasesGuiFgc' + GameConfig.ASSET_SIZE].getName(),
            Assets.Atlases['AtlasesGuiFgc' + GameConfig.ASSET_SIZE].getPNG(),
            Assets.Atlases['AtlasesGuiFgc' + GameConfig.ASSET_SIZE].getJSONArray());
        /*game.load.script(
            Assets.Scripts.ScriptsGlowFilter.getName(),
            Assets.Scripts.ScriptsGlowFilter.getJS());*/
        this.additionalLoads();
    }

    private static additionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            Assets.Images['ImagesSpin' + GameConfig.ASSET_SIZE].getName(),
            Assets.Images['ImagesSpin' + GameConfig.ASSET_SIZE].getPNG());
        if (GameConfig.PUB_MODE !== PublishMode.NO_AD) {
            game.load.script(
                Assets.Scripts.ScriptsPhaserAds.getName(),
                Assets.Scripts.ScriptsPhaserAds.getJS());
        }
    }
}
