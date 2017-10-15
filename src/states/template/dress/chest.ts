import {GameConfig} from '../../../config/game.config';
import {ChestPage} from './chest.page';
import {GuiUtils} from '../../../utils/gui.utils';
import {isNull, isString} from 'util';
import {TweenUtils} from '../../../utils/tween.utils';
export class Chest {

    private game: Phaser.Game = null;
    private state: Phaser.State = null;
    private instance: Chest = null;

    private currentPage: number = 0;

    private container: Phaser.Group = null;
    private bg: Phaser.Sprite = null;
    private pages: Array<ChestPage> = [];
    private btns: Array<Phaser.Button> = [];
    private staticPage: ChestPage = null;
    private hiddenX: number;

    constructor(state: Phaser.State, hiddenX: number = -700) {
        this.instance = this;
        this.game = GameConfig.GAME;
        this.state = state;
        this.hiddenX = hiddenX;
        this.container = this.game.add.group();
        this.container.x = this.hiddenX;
    }

    disable(): void {
        for (let page of this.pages) {
            page.disable();
        }
    }

    show(): void {
        TweenUtils.slideIn(this.container, 0);
    }

    hide(): void {
        TweenUtils.slideOut(this.container, this.hiddenX);
    }

    nextPage(): void {
        this.currentPage++;
        if (this.currentPage > this.pages.length - 1) this.currentPage = 0;
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].hide();
        }
        this.pages[this.currentPage].show();
    }

    prevPage(): void {
        this.currentPage--;
        if (this.currentPage < 0) this.currentPage = this.pages.length - 1;
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].hide();
        }
        this.pages[this.currentPage].show();
    }

    background(x: number, y: number, asset: string, frame?: any): Chest {
        this.bg = this.game.add.sprite(x, y, asset, frame, this.container);
        return this.instance;
    }

    page(): ChestPage {
        const page = new ChestPage(this, this.state, this.container);
        this.pages.push(page);
        return page;
    }

    static(): ChestPage {
        const page = new ChestPage(this, this.state, this.container);
        this.pages.push(page);
        return page;
    }

    button(x: number, y: number, name: string, asset: string, frames?: any|any[],
        callback?: Function, overHandler: Function = GuiUtils.addOverHandler, outHandler: Function = GuiUtils.addOutHandler): Chest {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.btns[name] =
            GuiUtils.makeButton(
                this.state, this.container,
                x, y, 1,
                name, asset, frames,
                true, true, true, callback, overHandler, outHandler);
        return this.instance;
    }

    build(): Chest {
        if (this.pages.length > 1) {
            for (let i = 1; i < this.pages.length; i++) {
                this.pages[i].hide();
            }
        }
        return this.instance;
    }

    dispose(): void {
        if (!isNull(this.staticPage)) this.staticPage.dispose();
        if (!isNull(this.bg)) this.bg.destroy(true);
        for (let page of this.pages) {
            page.dispose();
        }
        this.container.destroy(true);
    }
}