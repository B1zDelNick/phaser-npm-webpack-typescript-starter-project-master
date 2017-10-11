import * as AssetUtils from '../utils/asset.utils';
import {IPreloader} from './preload/i.preloader';
import {AssetMode, GameConfig, Sites} from '../config/game.config';
import {MyCuteGamesPreloader} from './preload/mcg.preloader';
import {DressupMixPreloader} from './preload/du.preloader';
import {FreeGamesCasualPreloader} from './preload/fgc.preloader';
import {PreloaderUtils} from '../utils/preloader.utils';

export default class Preloader extends Phaser.State {

    private preloader: IPreloader = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.preloader = new MyCuteGamesPreloader(this);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.preloader = new DressupMixPreloader(this);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.preloader = new FreeGamesCasualPreloader(this);
                break;
            }
        }
    }

    public preload(): void {
        this.preloader.preload();
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this);
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND)
            AssetUtils.Loader.loadSelectedAssets(this.game, PreloaderUtils.preloadStartState, false, this.waitForSoundDecoding, this);
    }

    public create(): void {
        this.preloader.create();
    }

    public update(): void {
        super.update(this.game);
        this.preloader.update();
    }

    public shutdown(): void {
        this.preloader.dispose();
    }

    private waitForSoundDecoding(): void {
        AssetUtils.Loader.waitForSoundDecoding(() => {
            // enable sound or else
            this.preloader.enableButton();
        }, this);
    }
}
