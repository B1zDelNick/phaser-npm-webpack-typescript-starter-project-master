import * as Assets from '../../assets';
import {IGui, StateType} from './i.gui';
import {GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {ISaver} from '../saver/i.saver';

export class GuiMcg implements IGui {

    private game: Phaser.Game;
    private state: Phaser.State;
    private type: StateType;

    private guiContainer: Phaser.Group = null;
    private playButton: Phaser.Button = null;
    private musonButton: Phaser.Button = null;
    private musoffButton: Phaser.Button = null;
    private logoButton: Phaser.Button = null;
    private moreButton: Phaser.Button = null;

    private extras: Array<Phaser.Button> = [];

    constructor(state: Phaser.State, type: StateType) {
        this.game = GameConfig.GAME;
        this.state = state;
        this.type = type;
    }

    addGui(defaultGui: boolean = true): void {
        this.guiContainer = this.game.add.group();

        if (defaultGui)
            this.addMoreBtn();

        this.addLogoBtn();
        this.addMusicBtns();
    }

    addPlayBtn(callback?: Function): Phaser.Button {
        let asset: string;

        if (this.type === StateType.START_STATE) {
            asset = Assets.Spritesheets.SpritesheetsPlayMcg1651322.getName();
        }
        else if (this.type === StateType.FINAL_STATE) {
            asset = Assets.Spritesheets.SpritesheetsReplayMcg1651322.getName();
        }
        else {
            asset = Assets.Spritesheets.SpritesheetsDoneMcg1651322.getName();
        }

        this.playButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                -15, 590, 1,
                '', asset, [0, 1, 0],
                true, false, true, callback, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);

        return this.playButton;
    }

    addExtraMore(callback?: Function): Phaser.Button {
        // TODO Implemetnt Extra More Logic, Later through XML ot Json file template
        return null;
    }

    addMoreBtn(): Phaser.Button {
        this.moreButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                810, 590, 1,
                '', Assets.Spritesheets.SpritesheetsMoreMcg1651322.getName(), [0, 1, 0],
                true, false, true, GuiUtils.goLinkMainMoreGames, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);

        return this.moreButton;
    }

    addLogoBtn(): Phaser.Button {
        this.logoButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                -10, -10, 1,
                '', Assets.Atlases.AtlasesGuiMcg.getName(),
                [Assets.Atlases.AtlasesGuiMcg.Frames.LogoMcg, Assets.Atlases.AtlasesGuiMcg.Frames.LogoMcg, Assets.Atlases.AtlasesGuiMcg.Frames.LogoMcg],
                true, false, true, GuiUtils.goLinkMainLogo, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);

        return this.logoButton;
    }

    addMusicBtns(): Array<Phaser.Button> {
        this.musonButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                845, 0, .75,
                '', Assets.Spritesheets.SpritesheetsMusicMcg1651322.getName(), [0, 1, 0],
                true, false, true, null, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);

        this.musoffButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                845, 0, .75,
                '', Assets.Spritesheets.SpritesheetsMusicOffMcg1651322.getName(), [0, 1, 0],
                true, false, false, null, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);

        return [this.musonButton, this.musoffButton];
    }

    addExtraBtn(x: number, y: number, asset: string, frames?: any, callback?: Function): Phaser.Button {
        if (frames == null) frames = [0, 0, 0];
        const btn =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                x, y, 1,
                '', asset, frames,
                true, false, true, callback, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.guiContainer.add(btn);
        this.extras.push(btn);

        return btn;
    }

    dispose(): void {
    }
}