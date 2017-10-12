import * as Assets from '../../assets';
import {GameConfig} from '../../config/game.config';

export class SoundUtils {

    private static globalSoundEnabled: boolean = true;
    private static audios: Array<Phaser.Sound> = [];
    private static audioSprites: Array<Phaser.AudioSprite> = [];
    public static onSwitchAudio: Phaser.Signal;
    private static currentTheme: string;

    public static init(mainTheme?: string): void {
        if (!mainTheme && Assets.Audio['AudioMainTheme']) {
            mainTheme = Assets.Audio['AudioMainTheme'].getName();
        }
        this.currentTheme = mainTheme;
        this.audios[mainTheme] = (GameConfig.GAME.sound.play(mainTheme, 0.5, true));
        this.onSwitchAudio = new Phaser.Signal();
    }

    public static mainThemeSwitch(): void {
        if (SoundUtils.globalSoundEnabled) {
            SoundUtils.globalSoundEnabled = false;
            SoundUtils.audios[SoundUtils.currentTheme].pause();

            /*musOff.visible = true;
            musOff.input.enabled = true;
            musOn.visible = false;
            musOn.input.enabled = false;*/
        }
        else {
            SoundUtils.globalSoundEnabled = true;
            SoundUtils.audios[SoundUtils.currentTheme].resume();

            /*musOff.visible = false;
            musOff.input.enabled = false;
            musOn.visible = true;
            musOn.input.enabled = true;*/
        }
        SoundUtils.onSwitchAudio.dispatch();
    }

    public static isSoundEnabled(): boolean {
        return this.globalSoundEnabled;
    }
}