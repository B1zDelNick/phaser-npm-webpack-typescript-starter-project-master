import {IGui, StateType} from './i.gui';
import {GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {isNull, isString} from 'util';
import {ImageUtils} from '../../utils/images/image.utils';
import {SoundUtils} from '../../utils/sound/sound.utils';

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
    private moreButton2: Phaser.Sprite = null;

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
            frame = ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.PlayDu.toString();
        }
        else if (this.type === StateType.FINAL_STATE) {
            frame = ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.ReplayDu.toString();
        }
        else {
            frame = ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.NextDu.toString();
        }

        this.playButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                4, 582, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
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

    addExtraMoreAnimated(x: number, y: number, asset: string, frameRate: number = 10, loop: boolean = true,
                 overHandler: Function = GuiUtils.addOverHandler,
                 outHandler: Function = GuiUtils.addOutHandler,
                 callback: Function = GuiUtils.goLinkMainMoreGames): Phaser.Sprite {

        this.moreButton2 =
            GuiUtils.makeSpritesheetButton(
                this.state, this.guiContainer,
                x, y, 1, frameRate, loop,
                '', asset,
                true, true, true, callback, overHandler, outHandler);

        return this.moreButton2;
    }

    addMoreBtn(): Phaser.Button {
        this.moreButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                817, 582, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.MoreDu,
                true, false, true, GuiUtils.goLinkMainMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        return this.moreButton;
    }

    addLogoBtn(): Phaser.Button  {
        this.logoButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                -13, -5, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.LogoDu,
                true, false, true, GuiUtils.goLinkMainLogo, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        return this.logoButton;
    }

    addMusicBtns(): Array<Phaser.Button> {
        this.musonButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                852, -15, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.SoundOnDu,
                true, false, SoundUtils.isSoundEnabled(), SoundUtils.mainThemeSwitch, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.musoffButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                852, -15, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.SoundOffDu,
                true, false, !SoundUtils.isSoundEnabled(), SoundUtils.mainThemeSwitch, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        SoundUtils.onSwitchAudio.add(() => {
            this.musonButton.visible = !this.musonButton.visible;
            this.musoffButton.visible = !this.musoffButton.visible;
        }, this);

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
        for (let btn of this.extras) {
            btn.inputEnabled = false;
            btn.filters = null;
        }
        if (!isNull(this.playButton)) this.playButton.inputEnabled = false;
        if (!isNull(this.playButton)) this.playButton.filters = null;
        this.musonButton.inputEnabled = false;
        this.musonButton.filters = null;
        this.musoffButton.inputEnabled = false;
        this.musoffButton.filters = null;
    }

    dispose(): void {
        SoundUtils.onSwitchAudio.removeAll(this);
        if (!isNull(this.playButton)) this.playButton.destroy(true);
        this.musonButton.destroy(true);
        this.musoffButton.destroy(true);
        if (!isNull(this.moreButton)) this.moreButton.destroy(true);
        if (!isNull(this.moreButton2)) this.moreButton2.destroy(true);
        for (let btn of this.extras) {
            btn.destroy(true);
        }
        this.guiContainer.destroy(true);
    }
}