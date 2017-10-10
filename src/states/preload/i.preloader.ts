export interface IPreloader {

    game: Phaser.Game;
    state: Phaser.State;

    preload(): void;
    create(): void;
    update(): void;
    shutdown(): void;
    enableButton(): void;
}