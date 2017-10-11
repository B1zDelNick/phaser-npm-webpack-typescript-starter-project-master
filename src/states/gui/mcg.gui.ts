import * as Assets from '../../assets';
import {IGui, StateType} from './i.gui';
import {GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {ISaver} from '../saver/i.saver';

export class GuiMcg implements IGui {

    game: Phaser.Game;
    state: Phaser.State;
    type: StateType;

    private nextPrepared = false;

    private saver: ISaver = null;

    private guiContainer: Phaser.Group = null;
    private playButton: Phaser.Button = null;
    private musonButton: Phaser.Button = null;
    private musoffButton: Phaser.Button = null;
    private logoButton: Phaser.Button = null;
    private moreButton: Phaser.Button = null;

    constructor(state: Phaser.State, type: StateType) {
        this.game = GameConfig.GAME;
        this.state = state;
    }

    addGui(): void {
        this.guiContainer = this.game.add.group();
        this.addPlayBtn();
        this.addMoreBtn();
        this.addLogoBtn();
        this.addMusicBtns();
    }

    addSaver(saver: ISaver): void {
        this.saver = saver;
    }

    public waitForLoading(): void {
        this.nextPrepared = true;
    }

    private addPlayBtn(): void {
        this.playButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                -15, 590, 1,
                '', Assets.Spritesheets.SpritesheetsPlayMcg1651322.getName(), [0, 1, 0],
                true, false, true, this.nextState, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);
    }

    private addMoreBtn(): void {
        this.moreButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                810, 590, 1,
                '', Assets.Spritesheets.SpritesheetsMoreMcg1651322.getName(), [0, 1, 0],
                true, false, true, GuiUtils.goLinkMainMoreGames, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);
    }

    private addLogoBtn(): void {
        this.logoButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                -10, -10, 1,
                '', Assets.Atlases.AtlasesGuiMcg.getName(),
                [Assets.Atlases.AtlasesGuiMcg.Frames.LogoMcg, Assets.Atlases.AtlasesGuiMcg.Frames.LogoMcg, Assets.Atlases.AtlasesGuiMcg.Frames.LogoMcg],
                true, false, true, GuiUtils.goLinkMainLogo, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);
    }

    private addMusicBtns(): void {
        this.musonButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                845, 0, .75,
                '', Assets.Spritesheets.SpritesheetsMusicMcg1651322.getName(), [0, 1, 0],
                true, false, true, null, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);

        this.musoffButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                845, 0, .75,
                '', Assets.Spritesheets.SpritesheetsMusicOffMcg1651322.getName(), [0, 1, 0],
                true, false, false, null, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);
    }

    private nextState(): void {
        if (this.saver) {
            this.saver.fadeOut(() => {
                this.game.state.start('Comix');
            });
        } else {
            this.game.camera.onFadeComplete.addOnce(() => {
                this.game.state.start('Comix');
            }, this);
            this.game.camera.fade(0x000000, 500, true, .85);
            const blocker = this.game.add.graphics(0, 0);
            blocker.beginFill(0, .5);
            blocker.drawRect(0, 0, 960, 720);
            blocker.inputEnabled = true;
        }
    }

    dispose(): void {
    }
}