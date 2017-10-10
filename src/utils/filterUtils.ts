import * as Assets from '../assets';

export class FilterUtils {
    public static makeFilter(
        game: Phaser.Game,
        textureWidth: number = 350,
        textureHeight: number = 350,
        distance: number = 5,
        outerStrength: number = 2,
        innerStrength: number = 1,
        color: number = 0xffffff,
        quality: number = 1): any {

            let f: Phaser.Filter = game.add.filter(Assets.Scripts.ScriptsGlowFilter.getName());

            (f as any).color = color;
            (f as any).textureWidth = textureWidth;
            (f as any).textureHeight = textureHeight;
            (f as any).distance = distance;
            (f as any).outerStrength = outerStrength;
            (f as any).innerStrength = innerStrength;
            (f as any).quality = quality;

            return f;
    }
}