import * as Assets from '../../assets';
import {IGui, StateType} from './i.gui';
import {GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {ISaver} from '../saver/i.saver';
import {isString} from 'util';

export class GuiDu implements IGui {

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
        let frame: string;

        if (this.type === StateType.START_STATE) {
            frame = Assets.Atlases.AtlasesGuiDu.Frames.PlayDu.toString();
        }
        else if (this.type === StateType.FINAL_STATE) {
            frame = Assets.Atlases.AtlasesGuiDu.Frames.ReplayDu.toString();
        }
        else {
            frame = Assets.Atlases.AtlasesGuiDu.Frames.NextDu.toString();
        }

        this.playButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                4, 582, 1,
                '', Assets.Atlases.AtlasesGuiDu.getName(),
                [frame, frame, frame],
                true, false, true, callback, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        return this.playButton;
    }

    addExtraMore(x: number, y: number, asset: string, frames?: any|any[],
                 overHandler: Function = GuiUtils.addOverHandler,
                 outHandler: Function = GuiUtils.addOutHandler,
                 callback: Function = GuiUtils.goLinkMainMoreGames): Phaser.Button {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.moreButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                x, y, 1,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        return this.moreButton;
    }

    addMoreBtn(): Phaser.Button {
        this.moreButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                817, 582, 1,
                '', Assets.Atlases.AtlasesGuiDu.getName(),
                [Assets.Atlases.AtlasesGuiDu.Frames.MoreDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.MoreDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.MoreDu],
                true, false, true, GuiUtils.goLinkMainMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        return this.moreButton;
    }

    addLogoBtn(): Phaser.Button  {
        this.logoButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                -13, -5, 1,
                '', Assets.Atlases.AtlasesGuiDu.getName(),
                [Assets.Atlases.AtlasesGuiDu.Frames.LogoDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.LogoDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.LogoDu],
                true, false, true, GuiUtils.goLinkMainLogo, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        return this.logoButton;
    }

    addMusicBtns(): Array<Phaser.Button> {
        this.musonButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                852, -15, 1,
                '', Assets.Atlases.AtlasesGuiDu.getName(),
                [Assets.Atlases.AtlasesGuiDu.Frames.SoundOnDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.SoundOnDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.SoundOnDu],
                true, false, true, null, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.musoffButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                852, -15, 1,
                '', Assets.Atlases.AtlasesGuiDu.getName(),
                [Assets.Atlases.AtlasesGuiDu.Frames.SoundOffDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.SoundOffDu,
                    Assets.Atlases.AtlasesGuiDu.Frames.SoundOffDu],
                true, false, true, null, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        return [this.musonButton, this.musoffButton];
    }

    addExtraBtn(x: number, y: number, asset: string, frames?: any|any[],
                callback?: Function,
                overHandler: Function = GuiUtils.addOverHandler,
                outHandler: Function = GuiUtils.addOutHandler): Phaser.Button {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        const btn =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                x, y, 1,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        this.guiContainer.add(btn);
        this.extras.push(btn);

        return btn;
    }

    disable(): void {
    }

    dispose(): void {
    }
}