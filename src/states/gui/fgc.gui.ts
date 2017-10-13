import * as Assets from '../../assets';
import {IGui, StateType} from './i.gui';
import {GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {isString} from 'util';
import {SoundUtils} from '../../utils/sound/sound.utils';

export class GuiFgc implements IGui {

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
        let X: number = -5;
        let Y: number = 593;

        if (this.type === StateType.START_STATE) {
            frame = Assets.Atlases.AtlasesGuiFgc.Frames.StartFgc.toString();
            X = 3;
            Y = 577;
        }
        else if (this.type === StateType.FINAL_STATE) {
            frame = Assets.Atlases.AtlasesGuiFgc.Frames.ReplayFgc.toString();
        }
        else {
            frame = Assets.Atlases.AtlasesGuiFgc.Frames.DoneFgc.toString();
        }

        this.playButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                X, Y, 1,
                '', Assets.Atlases.AtlasesGuiFgc.getName(),
                [frame, frame, frame],
                true, false, true, callback, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        return this.playButton;
    }

    addExtraMore(x: number, y: number, asset: string, frames?: string|any[],
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
                833, 593, 1,
                '', Assets.Atlases.AtlasesGuiFgc.getName(),
                [Assets.Atlases.AtlasesGuiFgc.Frames.MoreFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.MoreFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.MoreFgc],
                true, false, true, GuiUtils.goLinkMainMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        return this.moreButton;
    }

    addLogoBtn(): Phaser.Button {
        this.logoButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                710, 0, .8,
                '', Assets.Atlases.AtlasesGuiFgc.getName(),
                [Assets.Atlases.AtlasesGuiFgc.Frames.LogoFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.LogoFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.LogoFgc],
                true, false, true, GuiUtils.goLinkMainLogo, GuiUtils.addOverHandlerFgc, GuiUtils.addOutHandlerFgc);

        return this.logoButton;
    }

    addMusicBtns(): Array<Phaser.Button> {
        this.musonButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                -6, -9, 1,
                '', Assets.Atlases.AtlasesGuiFgc.getName(),
                [Assets.Atlases.AtlasesGuiFgc.Frames.SoundOnFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.SoundOnFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.SoundOnFgc],
                true, false, SoundUtils.isSoundEnabled(), SoundUtils.mainThemeSwitch, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.musoffButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                -6, -9, 1,
                '', Assets.Atlases.AtlasesGuiFgc.getName(),
                [Assets.Atlases.AtlasesGuiFgc.Frames.SoundOffFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.SoundOffFgc,
                    Assets.Atlases.AtlasesGuiFgc.Frames.SoundOffFgc],
                true, false, !SoundUtils.isSoundEnabled(), SoundUtils.mainThemeSwitch, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        SoundUtils.onSwitchAudio.add(() => {
            this.musonButton.visible = !this.musonButton.visible;
            this.musoffButton.visible = !this.musoffButton.visible;
        }, this);

        return [this.musonButton, this.musoffButton];
    }

    addExtraBtn(x: number, y: number, asset: string, frames?: string|any[],
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

        this.extras.push(btn);

        return btn;
    }

    dispose(): void {
        SoundUtils.onSwitchAudio.removeAll(this);
    }
}