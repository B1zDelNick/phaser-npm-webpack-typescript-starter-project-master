import {ISaver} from '../saver/i.saver';
export interface IGui {
    game: Phaser.Game;
    state: Phaser.State;
    type: StateType;

    addGui(): void;
    addSaver(saver: ISaver): void;
    dispose(): void;
    waitForLoading(): void;
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