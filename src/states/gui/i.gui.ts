export interface IGui {
    addGui(): void;
    addPlayBtn(callback?: Function): Phaser.Button;
    addMoreBtn(): Phaser.Button;
    addExtraMore(callback?: Function): Phaser.Button;
    addLogoBtn(): Phaser.Button;
    addMusicBtns(): Array<Phaser.Button>;
    dispose(): void;
    addExtraBtn(x: number, y: number, asset: string, frames?: any, callback?: Function): Phaser.Button;
}

export enum StateType {
    START_STATE,
    COMIX_STATE,
    SELECT_STATE,
    MAKEUP_STATE,
    DRESS_STATE,
    RESULT_STATE,
    MINIGAME_STATE,
    CROSS_STATE,
    FINAL_STATE
}