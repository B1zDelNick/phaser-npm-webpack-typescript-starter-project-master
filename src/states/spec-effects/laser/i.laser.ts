export interface ILaser {
    init(asset: string, frame?: string): void;
    start(): void;
    dispose(): void;
}