import * as Assets from '../../assets';
import {GameConfig} from '../../config/game.config';
import {isNull, isUndefined} from 'util';

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
        this.onSwitchAudio = new Phaser.Signal();

        if (isNull(this.currentTheme) || isUndefined(this.currentTheme)) return;

        this.audios[mainTheme] = (GameConfig.GAME.sound.play(mainTheme, 0.5, true));
    }

    public static mainThemeSwitch(): void {
        if (SoundUtils.globalSoundEnabled) {
            SoundUtils.globalSoundEnabled = false;

            if (!isNull(SoundUtils.currentTheme) && !isUndefined(SoundUtils.currentTheme))
                SoundUtils.audios[SoundUtils.currentTheme].pause();
        }
        else {
            SoundUtils.globalSoundEnabled = true;

            if (!isNull(SoundUtils.currentTheme) && !isUndefined(SoundUtils.currentTheme))
                SoundUtils.audios[SoundUtils.currentTheme].resume();
        }
        SoundUtils.onSwitchAudio.dispatch();
    }

    public static isSoundEnabled(): boolean {
        return this.globalSoundEnabled;
    }
}