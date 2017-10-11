import * as Assets from '../assets';
import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';

export default class Comix extends Phaser.State {

    private gui: IGui = null;
    private saver: ISaver = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.COMIX_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.COMIX_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.COMIX_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {
        this.game.add.sprite(0, 0, Assets.Images.ImagesBg3.getName());
        this.gui.addGui();
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
            this.gui.addSaver(this.saver);
        } else {
            this.game.camera.flash(0x000000, 750, true, .95);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.gui.dispose();
    }
}

