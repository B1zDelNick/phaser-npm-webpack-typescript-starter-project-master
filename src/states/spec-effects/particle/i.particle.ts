export interface IParticle {
    init(asset: string, frames?: any|any[]): void;
    addToContainer(cont: Phaser.Group): void;
    start(): void;
    update(): void;
    dispose(): void;
}