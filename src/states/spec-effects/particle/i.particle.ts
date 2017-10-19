export interface IParticle {
    init(asset: string, frames?: any|any[]): void;
    start(): void;
    update(): void;
    dispose(): void;
}