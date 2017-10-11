import * as Assets from '../../assets';
import {IGui, StateType} from './i.gui';
import {GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {ISaver} from '../saver/i.saver';

export class GuiFgc implements IGui {

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
        this.type = type;
    }

    addGui(extraMore: boolean = false): void {
        this.guiContainer = this.game.add.group();
        this.addPlayBtn();
        if (!extraMore)
            this.addMoreBtn();
        else
            this.addExtraMore();
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
                3, 577, 1,
                '', Assets.Atlases.AtlasesGuiFgc.getName(),
                [Assets.Atlases.AtlasesGuiFgc.Frames.StartFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.StartFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.StartFgc],
                true, false, true, this.nextState, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
    }
    private addExtraMore(): void {
        // TODO Implemetnt Extra More Logic, Later through XML ot Json file template
    }

    private addMoreBtn(): void {
        this.moreButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                833, 593, 1,
                '', Assets.Atlases.AtlasesGuiFgc.getName(),
                [Assets.Atlases.AtlasesGuiFgc.Frames.MoreFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.MoreFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.MoreFgc],
                true, false, true, GuiUtils.goLinkMainMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
    }

    private addLogoBtn(): void {
        this.logoButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                710, 0, .8,
                '', Assets.Atlases.AtlasesGuiFgc.getName(),
                [Assets.Atlases.AtlasesGuiFgc.Frames.LogoFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.LogoFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.LogoFgc],
                true, false, true, GuiUtils.goLinkMainLogo, GuiUtils.addOverHandlerFgc, GuiUtils.addOutHandlerFgc);
    }

    private addMusicBtns(): void {
        this.musonButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                -6, -9, 1,
                '', Assets.Atlases.AtlasesGuiFgc.getName(),
                [Assets.Atlases.AtlasesGuiFgc.Frames.SoundOnFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.SoundOnFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.SoundOnFgc],
                true, false, true, null, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.musoffButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                -6, -9, 1,
                '', Assets.Atlases.AtlasesGuiFgc.getName(),
                [Assets.Atlases.AtlasesGuiFgc.Frames.SoundOffFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.SoundOffFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.SoundOffFgc],
                true, false, true, null, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
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