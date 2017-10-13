export interface IGui {
    addGui(defaultGui?: boolean): void;
    addPlayBtn(callback?: Function): Phaser.Button;
    addMoreBtn(): Phaser.Button;
    addExtraMore(x: number, y: number, asset: string, frames?: string|any[], overHandler?: Function, outHandler?: Function, callback?: Function): Phaser.Button;
    addLogoBtn(): Phaser.Button;
    addMusicBtns(): Array<Phaser.Button>;
    dispose(): void;
    addExtraBtn(x: number, y: number, asset: string, frames?: string|any[], callback?: Function, overHandler?: Function, outHandler?: Function): Phaser.Button;
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