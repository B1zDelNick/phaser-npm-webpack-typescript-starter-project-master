import * as Assets from '../assets';
import {IGui, StateType} from './gui/i.gui';
import {GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';

export default class Start extends Phaser.State {

    private gui: IGui = null;

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
        this.game.camera.flash(0x000000, 750, true, .95);
        this.game.add.sprite(0, 0, Assets.Images.ImagesBg.getName());
        this.gui.addGui();
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.gui.dispose();
    }
}

