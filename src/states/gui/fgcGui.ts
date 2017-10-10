import * as Assets from '../../assets';
import {IGui, StateType} from './i.gui';
import {GameConfig} from '../../config/gameConfig';
import {GuiUtils} from '../../utils/guiUtils';

export class GuiFgc implements IGui {

    game: Phaser.Game;
    state: Phaser.State;
    type: StateType;

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

    addGui(): void {
        this.guiContainer = this.game.add.group();
        this.addPlayBtn();
        this.addMoreBtn();
        this.addLogoBtn();
        this.addMusicBtns();
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
        this.game.camera.onFadeComplete.addOnce(() => {
            // this.game.state.start('Start');
        }, this);
        this.game.camera.fade(0x000000, 500, true, .85);
    }

    dispose(): void {
    }
}