import * as Assets from '../../../assets';
import {GameConfig, Sites} from '../../../config/game.config';
import {isNull, isUndefined} from 'util';
import {ImageUtils} from '../../../utils/images/image.utils';

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
    private strictIndexes: number[];

    constructor(container: Phaser.Group, x: number, y: number,
                asset: string, frameClass: any, prefix?: string, defaultFrame?: string,
                removable: boolean = false, strictIndexes: number[] = []) {

        this.game = GameConfig.GAME;
        this.asset = asset;
        this.frameClass = frameClass;
        this.prefix = prefix;
        this.removable = removable;
        this.strictIndexes = strictIndexes;
        this.isEmpty = isUndefined(defaultFrame) || isNull(defaultFrame);

        switch (GameConfig.SITE) {
            case Sites.FREE_GAMES_CASUAL: {
                this.guiAtlas = ImageUtils.getAtlasClass('AtlasesGuiFgc').getName();
                this.dummyFrame = ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.Dummy;
                break;
            }
            case Sites.MY_CUTE_GAMES: {
                this.guiAtlas = ImageUtils.getAtlasClass('AtlasesGuiMcg').getName();
                this.dummyFrame = ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.Dummy;
                break;
            }
            case Sites.DRESSUP_MIX: {
                this.guiAtlas = ImageUtils.getAtlasClass('AtlasesGuiDu').getName();
                this.dummyFrame = ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.Dummy;
                break;
            }
        }

        this.sprite = this.game.add.sprite(x, y,
            this.isEmpty ? this.guiAtlas : asset,
            this.isEmpty ? this.dummyFrame : frameClass[defaultFrame],
            container);
    }

    operate(index: number): boolean {
        // console.log(this.sprite.frameName, this.sprite.key, this.prefix + index);
        // console.log(this.sprite.frameName === this.frameClass[this.prefix + index], this.removable);
        if (this.sprite.frameName === this.frameClass[this.prefix + index] && this.removable || index === -1) {
            this.sprite.loadTexture(this.guiAtlas, this.dummyFrame);
        }
        else {
            if (this.isStricted(index)) {
                this.sprite.loadTexture(this.guiAtlas, this.dummyFrame);
            }
            else {
                this.sprite.loadTexture(this.asset, this.frameClass[(this.prefix + (index !== 0 ? index : ''))]);
            }
            return !this.removable;
        }
        return false;
    }

    remove() {
        this.sprite.loadTexture(this.guiAtlas, this.dummyFrame);
    }

    private isStricted(ind): boolean {
        for (let i of this.strictIndexes) {
            if (i === ind) return true;
        }
        return false;
    }

    dispose(): void {
        this.sprite.destroy(true);
    }
}