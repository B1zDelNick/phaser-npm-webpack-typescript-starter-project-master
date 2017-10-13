import * as Assets from '../assets';
import {GameConfig, PublishMode} from '../config/game.config';

export class BootUtils {

    public static preloadMcg(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (GameConfig.PUB_MODE === PublishMode.GAME_DISTRIBUTIONS) {
            game.load.image(
                Assets.Images.ImagesPreroll2Mcg.getName(),
                Assets.Images.ImagesPreroll2Mcg.getPNG());
        } else {
            game.load.image(
                Assets.Images.ImagesPrerollMcg.getName(),
                Assets.Images.ImagesPrerollMcg.getJPG());
        }
        game.load.atlasJSONArray(
            Assets.Atlases.AtlasesPreloaderAtlasMcg.getName(),
            Assets.Atlases.AtlasesPreloaderAtlasMcg.getPNG(),
            Assets.Atlases.AtlasesPreloaderAtlasMcg.getJSONArray());
        game.load.atlasJSONArray(
            Assets.Atlases.AtlasesGuiMcg.getName(),
            Assets.Atlases.AtlasesGuiMcg.getPNG(),
            Assets.Atlases.AtlasesGuiMcg.getJSONArray());
        game.load.json(
            Assets.JSON.JsonDoll.getName(),
            Assets.JSON.JsonDoll.getJSON());
        game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsPlayMcg1651322.getName(),
            Assets.Spritesheets.SpritesheetsPlayMcg1651322.getPNG(),
            Assets.Spritesheets.SpritesheetsPlayMcg1651322.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsPlayMcg1651322.getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsReplayMcg1651322.getName(),
            Assets.Spritesheets.SpritesheetsReplayMcg1651322.getPNG(),
            Assets.Spritesheets.SpritesheetsReplayMcg1651322.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsReplayMcg1651322.getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsLArrMcg1651322.getName(),
            Assets.Spritesheets.SpritesheetsLArrMcg1651322.getPNG(),
            Assets.Spritesheets.SpritesheetsLArrMcg1651322.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsLArrMcg1651322.getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsDoneMcg1651322.getName(),
            Assets.Spritesheets.SpritesheetsDoneMcg1651322.getPNG(),
            Assets.Spritesheets.SpritesheetsDoneMcg1651322.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsDoneMcg1651322.getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsMoreMcg1651322.getName(),
            Assets.Spritesheets.SpritesheetsMoreMcg1651322.getPNG(),
            Assets.Spritesheets.SpritesheetsMoreMcg1651322.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsMoreMcg1651322.getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsMusicMcg1651322.getName(),
            Assets.Spritesheets.SpritesheetsMusicMcg1651322.getPNG(),
            Assets.Spritesheets.SpritesheetsMusicMcg1651322.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsMusicMcg1651322.getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsMusicOffMcg1651322.getName(),
            Assets.Spritesheets.SpritesheetsMusicOffMcg1651322.getPNG(),
            Assets.Spritesheets.SpritesheetsMusicOffMcg1651322.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsMusicOffMcg1651322.getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsNextMcg1731322.getName(),
            Assets.Spritesheets.SpritesheetsNextMcg1731322.getPNG(),
            Assets.Spritesheets.SpritesheetsNextMcg1731322.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsNextMcg1731322.getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsPhotoMcg1651322.getName(),
            Assets.Spritesheets.SpritesheetsPhotoMcg1651322.getPNG(),
            Assets.Spritesheets.SpritesheetsPhotoMcg1651322.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsPhotoMcg1651322.getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsRArrMcg1651322.getName(),
            Assets.Spritesheets.SpritesheetsRArrMcg1651322.getPNG(),
            Assets.Spritesheets.SpritesheetsRArrMcg1651322.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsRArrMcg1651322.getFrameHeight());
        game.load.spritesheet(
            Assets.Spritesheets.SpritesheetsReplayMcg1651322.getName(),
            Assets.Spritesheets.SpritesheetsReplayMcg1651322.getPNG(),
            Assets.Spritesheets.SpritesheetsReplayMcg1651322.getFrameWidth(),
            Assets.Spritesheets.SpritesheetsReplayMcg1651322.getFrameHeight());
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
            Assets.Images.ImagesPrerollDu.getName(),
            Assets.Images.ImagesPrerollDu.getJPG());
        game.load.atlasJSONArray(
            Assets.Atlases.AtlasesPreloaderAtlasDu.getName(),
            Assets.Atlases.AtlasesPreloaderAtlasDu.getPNG(),
            Assets.Atlases.AtlasesPreloaderAtlasDu.getJSONArray());
        game.load.atlasJSONArray(
            Assets.Atlases.AtlasesGuiDu.getName(),
            Assets.Atlases.AtlasesGuiDu.getPNG(),
            Assets.Atlases.AtlasesGuiDu.getJSONArray());
        /*game.load.script(
            Assets.Scripts.ScriptsGlowFilter.getName(),
            Assets.Scripts.ScriptsGlowFilter.getJS());*/
        this.additionalLoads();
    }

    public static preloadFgc(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.image(
            Assets.Images.ImagesPrerollFgc.getName(),
            Assets.Images.ImagesPrerollFgc.getJPG());
        game.load.atlasJSONArray(
            Assets.Atlases.AtlasesPreloaderAtlasFgc.getName(),
            Assets.Atlases.AtlasesPreloaderAtlasFgc.getPNG(),
            Assets.Atlases.AtlasesPreloaderAtlasFgc.getJSONArray());
        game.load.atlasJSONArray(
            Assets.Atlases.AtlasesGuiFgc.getName(),
            Assets.Atlases.AtlasesGuiFgc.getPNG(),
            Assets.Atlases.AtlasesGuiFgc.getJSONArray());
        /*game.load.script(
            Assets.Scripts.ScriptsGlowFilter.getName(),
            Assets.Scripts.ScriptsGlowFilter.getJS());*/
        this.additionalLoads();
    }

    private static additionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            Assets.Images.ImagesSpin.getName(),
            Assets.Images.ImagesSpin.getPNG());
    }
}
