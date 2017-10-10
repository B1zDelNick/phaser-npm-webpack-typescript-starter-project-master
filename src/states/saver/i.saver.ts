export interface ISaver {
    game: Phaser.Game;
    state: Phaser.State;
    vs: Phaser.Button;
    part1: Phaser.Sprite;
    part2: Phaser.Sprite;

    fadeIn(): void;
    fadeOut(): void;
}