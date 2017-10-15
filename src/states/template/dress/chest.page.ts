import {GameConfig} from '../../../config/game.config';
import {ChestItem} from './chest.item';
import {Chest} from './chest';
import {GuiUtils} from '../../../utils/gui.utils';
import {isNull} from 'util';
export class ChestPage {

    private instance: ChestPage = null;
    private owner: Chest = null;
    private game: Phaser.Game = null;
    private state: Phaser.State = null;

    private container: Phaser.Group = null;
    private shelf: Phaser.Sprite = null;
    private items: Array<ChestItem> = [];

    constructor(owner: Chest, state: Phaser.State, container: Phaser.Group) {
        this.instance = this;
        this.owner = owner;
        this.game = GameConfig.GAME;
        this.state = state;
        this.container = this.game.add.group();
        container.add(this.container);
    }

    disable(): void {
        for (let item of this.items) {
            item.disable();
        }
    }

    hide(): void {
        this.container.visible = false;
    }

    show(): void {
        this.container.visible = true;
    }

    pageShelf(x: number, y: number, asset: string, frame?: any): ChestPage {
        this.shelf = this.game.add.sprite(x, y, asset, frame, this.container);
        return this.instance;
    }

    item(x: number, y: number, name: string, asset: string, frames?: any|any[],
         callback?: Function, overHandler: Function = GuiUtils.addOverGlowHandler, outHandler: Function = GuiUtils.addOutGlowHandler): ChestPage {
        this.items[name] = new ChestItem(this.state, this.container, x, y, name, asset, frames, callback, overHandler, outHandler);
        return this.instance;
    }

    build(): Chest {
        return this.owner;
    }

    dispose(): void {
        for (let item of this.items) {
            item.dispose();
        }
        if (!isNull(this.shelf)) this.shelf.destroy(true);
        this.container.destroy(true);
    }
}