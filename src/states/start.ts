import * as Assets from '../assets';
import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';

export default class Start extends Phaser.State {

    private gui: IGui = null;
    private saver: ISaver = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.START_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.START_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.START_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {
        this.game.add.sprite(0, 0, Assets.Images.ImagesBg.getName());
        this.gui.addGui();

        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            AssetUtils.Loader.loadSelectedAssets(this.game, PreloaderUtils.preloadComixState, true, this.waitForLoading, this);
            // this.game.load.start();
        }

        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
            this.gui.addSaver(this.saver);
        } else {
            // this.game.camera.flash(0x000000, 750, true, .95);
        }
        // ONLY FOR START STATE !!!!!!!!!!!!!!!!!
        this.game.camera.flash(0x000000, 750, true, .85);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.gui.dispose();
    }

    private waitForLoading(): void {
        this.gui.waitForLoading();
    }
}

