import {IParticle} from './i.particle';
import {GameConfig} from '../../../config/game.config';

export class LepestokParticles implements IParticle {

    private game: Phaser.Game = null;
    private emitter: Phaser.Particles.Arcade.Emitter = null;

    init(asset: string, frames?: any|any[]): void {
        this.game = GameConfig.GAME;
        this.emitter = this.game.add.emitter(this.game.world.centerX, -50, 100);
        this.emitter.width = 960;
        this.emitter.makeParticles(asset, frames);
        this.emitter.minParticleSpeed.setTo(-100, 30);
        this.emitter.maxParticleSpeed.setTo(100, 100);
        this.emitter.minParticleScale = 0.35;
        this.emitter.maxParticleScale = 0.65;
        this.emitter.gravity = new Phaser.Point(0, 70);
    }

    start(): void {
        this.emitter.flow(7000, 500, 3, -1);
    }

    update(): void {
    }

    dispose(): void {
        this.emitter.kill();
        this.emitter.destroy(true);
    }

}