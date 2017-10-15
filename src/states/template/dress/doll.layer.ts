import * as Assets from '../../../assets';
import {GameConfig, Sites} from '../../../config/game.config';
import {isNull, isUndefined} from 'util';

export class DollLayer {

    private game: Phaser.Game = null;
    private sprite: Phaser.Sprite = null;
    private asset: string;
    private frameClass: any = null;
    private guiAtlas: string = null;
    private dummyFrame: any = null;
    private prefix: string;
    private isEmpty: boolean;
    private removable: boolean;

    constructor(container: Phaser.Group, x: number, y: number, asset: string, frameClass: any, prefix?: string, defaultFrame?: string, removable: boolean = false) {
        this.game = GameConfig.GAME;
        this.asset = asset;
        this.frameClass = frameClass;
        this.prefix = prefix;
        this.removable = removable;
        this.isEmpty = isUndefined(defaultFrame) || isNull(defaultFrame);

        switch (GameConfig.SITE) {
            case Sites.FREE_GAMES_CASUAL: {
                this.guiAtlas = Assets.Atlases.AtlasesGuiFgc.getName();
                this.dummyFrame = Assets.Atlases.AtlasesGuiFgc.Frames.Dummy;
                break;
            }
            case Sites.MY_CUTE_GAMES: {
                this.guiAtlas = Assets.Atlases.AtlasesGuiMcg.getName();
                this.dummyFrame = Assets.Atlases.AtlasesGuiMcg.Frames.Dummy;
                break;
            }
            case Sites.DRESSUP_MIX: {
                this.guiAtlas = Assets.Atlases.AtlasesGuiDu.getName();
                this.dummyFrame = Assets.Atlases.AtlasesGuiDu.Frames.Dummy;
                break;
            }
        }

        this.sprite = this.game.add.sprite(x, y,
            this.isEmpty ? this.guiAtlas : asset,
            this.isEmpty ? this.dummyFrame : frameClass[defaultFrame],
            container);
    }

    operate(index: number) {
        // console.log(this.sprite.frameName, this.sprite.key, this.prefix + index);
        // console.log(this.sprite.frameName === this.frameClass[this.prefix + index], this.removable);
        if (this.sprite.frameName === this.frameClass[this.prefix + index] && this.removable || index === -1) {
            this.sprite.loadTexture(this.guiAtlas, this.dummyFrame);
        }
        else {
            this.sprite.loadTexture(this.asset, this.frameClass[(this.prefix + index)]);
        }
    }

    dispose(): void {
        this.sprite.destroy(true);
    }
}