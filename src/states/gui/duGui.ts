import * as Assets from '../../assets';
import {IGui, StateType} from './i.gui';
import {GameConfig} from '../../config/gameConfig';
import {GuiUtils} from '../../utils/guiUtils';

export class GuiDu implements IGui {

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
                4, 582, 1,
                '', Assets.Atlases.AtlasesGuiDu.getName(),
                [Assets.Atlases.AtlasesGuiDu.Frames.PlayDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.PlayDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.PlayDu],
                true, false, true, this.nextState, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
    }

    private addMoreBtn(): void {
        this.moreButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                817, 582, 1,
                '', Assets.Atlases.AtlasesGuiDu.getName(),
                [Assets.Atlases.AtlasesGuiDu.Frames.MoreDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.MoreDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.MoreDu],
                true, false, true, GuiUtils.goLinkMainMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
    }

    private addLogoBtn(): void {
        this.logoButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                -13, -5, 1,
                '', Assets.Atlases.AtlasesGuiDu.getName(),
                [Assets.Atlases.AtlasesGuiDu.Frames.LogoDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.LogoDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.LogoDu],
                true, false, true, GuiUtils.goLinkMainLogo, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
    }

    private addMusicBtns(): void {
        this.musonButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                852, -15, 1,
                '', Assets.Atlases.AtlasesGuiDu.getName(),
                [Assets.Atlases.AtlasesGuiDu.Frames.SoundOnDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.SoundOnDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.SoundOnDu],
                true, false, true, null, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.musoffButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                852, -15, 1,
                '', Assets.Atlases.AtlasesGuiDu.getName(),
                [Assets.Atlases.AtlasesGuiDu.Frames.SoundOffDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.SoundOffDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.SoundOffDu],
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