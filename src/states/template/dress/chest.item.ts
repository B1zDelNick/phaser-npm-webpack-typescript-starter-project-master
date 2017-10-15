import {GuiUtils} from '../../../utils/gui.utils';
import {isString} from 'util';
import {GameConfig} from '../../../config/game.config';

export class ChestItem {

    private game: Phaser.Game = null;
    private state: Phaser.State = null;
    private button: Phaser.Button = null;

    constructor(state: Phaser.State, container: Phaser.Group, x: number, y: number, name: string, asset: string, frames?: any|any[],
                callback?: Function, overHandler?: Function, outHandler?: Function) {

        this.game = GameConfig.GAME;
        this.state = state;

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.button =
            GuiUtils.makeButton(
                this.state, container,
                x, y, 1,
                name, asset, frames,
                true, true, true, callback, overHandler, outHandler);
    }

    disable(): void {
        this.button.inputEnabled = false;
        this.button.filters = null;
    }

    dispose(): void {
        this.button.destroy(true);
    }
}