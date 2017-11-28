export interface ILaser {
    init(asset: string, frame?: any|any[]): void;
    start(): void;
    dispose(): void;
}