export interface ISaver {
    init(state: Phaser.State): void;
    fadeIn(): void;
    fadeOut(callback: Function): void;
    dispose(callback: Function): void;
}