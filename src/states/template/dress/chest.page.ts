import {GameConfig} from '../../../config/game.config';
import {ChestItem} from './chest.item';
import {Chest} from './chest';
import {GuiUtils} from '../../../utils/gui.utils';
import {isNull} from 'util';
import {TweenUtils} from '../../../utils/tween.utils';
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

    tryToSetVisibility(name: string): boolean {
        for (let item of this.items) {
            if (item.name === name) {
                /*if (visible) {
                    item.button.inputEnabled = false;
                    item.button.filters = null;
                    TweenUtils.fadeOut(item.button, Phaser.Timer.SECOND * .3);
                }
                else {
                    item.button.inputEnabled = true;
                    item.button.filters = null;
                    TweenUtils.fadeIn(item.button, Phaser.Timer.SECOND * .3);
                }*/
                item.button.inputEnabled = false;
                item.button.filters = null;
                TweenUtils.fadeOut(item.button, Phaser.Timer.SECOND * .3);
                return true;
            }
        }
        return false;
    }

    tryToSetLikeVisibility(name: string): void {
        for (let item of this.items) {
            if (item.name.indexOf(name) !== -1) {
                item.button.inputEnabled = true;
                item.button.filters = null;
                TweenUtils.fadeIn(item.button, Phaser.Timer.SECOND * .3);
            }
        }
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
        this.items.push(new ChestItem(this.state, this.container, x, y, name, asset, frames, callback, overHandler, outHandler));
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