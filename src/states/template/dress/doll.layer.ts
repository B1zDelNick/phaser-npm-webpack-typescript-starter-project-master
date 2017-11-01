import * as Assets from '../../../assets';
import {GameConfig, Sites} from '../../../config/game.config';
import {isNull, isUndefined} from 'util';
import {ImageUtils} from '../../../utils/images/image.utils';

export class DollLayer {

    private game: Phaser.Game = null;
    private sprite: Phaser.Sprite = null;
    // private asset: string;
    // private frameClass: any = null;
    private assetClass: string = null;
    private guiAtlas: string = null;
    private dummyFrame: any = null;
    private prefix: string;
    public isEmpty: boolean;
    private removable: boolean;
    private strictIndexes: number[];
    public isSecondary: boolean = false;
    private tempIndex: number = -1;

    constructor(container: Phaser.Group, x: number, y: number,
                assetClass: string, prefix?: string, defaultFrame?: string,
                removable: boolean = false, strictIndexes: number[] = []) {

        this.game = GameConfig.GAME;
        // this.asset = asset;
        // this.frameClass = frameClass;
        this.assetClass = assetClass;
        this.prefix = prefix;
        this.removable = removable;
        this.strictIndexes = strictIndexes;
        this.isEmpty = isUndefined(defaultFrame) || isNull(defaultFrame);
        if (!this.isEmpty) {
            if (!isNaN(parseInt(defaultFrame.substr(defaultFrame.length - 1))))
                this.tempIndex = parseInt(defaultFrame.substr(defaultFrame.length - 1));
            else {
                this.tempIndex = 0;
            }
        }

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
            this.isEmpty ? this.guiAtlas : this.getClassForIndex(this.tempIndex).getName(),
            this.isEmpty ? this.dummyFrame : this.getClassForIndex(this.tempIndex).Frames[defaultFrame],
            container);
        if (this.sprite.inputEnabled) {
            this.sprite.input.pixelPerfectClick = this.sprite.input.pixelPerfectOver = true;
        }
    }

    operate(index: number): boolean {
        // console.log(this.sprite.frameName, this.sprite.key, this.prefix + index);
        // console.log(this.sprite.frameName === this.frameClass[this.prefix + index], this.removable);
        this.tempIndex = index;
        const clazz = this.getClassForIndex(index);
        if (this.sprite.frameName === clazz.Frames[this.prefix + (this.isSecondary ? 'S' : '') + index] && this.removable || index === -1) {
            this.sprite.loadTexture(this.guiAtlas, this.dummyFrame);
            this.isEmpty = true;
            // console.log(`Remove ${this.prefix}`);
        }
        else {
            if (this.isStricted(index)) {
                this.sprite.loadTexture(this.guiAtlas, this.dummyFrame);
                this.isEmpty = true;
                // console.log(`Stricted ${this.prefix}${this.tempIndex}`);
            }
            else if (isUndefined(clazz.Frames[this.prefix + (this.isSecondary ? 'S' : '') + index])) {
                this.sprite.loadTexture(this.guiAtlas, this.dummyFrame);
                this.isEmpty = true;
            }
            else {
                this.sprite.loadTexture(
                    clazz.getName(),
                    clazz.Frames[(this.prefix + (this.isSecondary ? 'S' : '') + (index !== 0 ? index : ''))]);
                this.isEmpty = false;
                // console.log(`Equip ${this.prefix}${this.tempIndex}`);
            }
            return !this.removable;
        }
        return false;
    }

    setSecondaryState(val: boolean) {
        this.isSecondary = val;
        if (!this.isEmpty) {
            this.sprite.loadTexture(
                this.getClassForIndex(this.tempIndex).getName(),
                this.getClassForIndex(this.tempIndex).Frames[(this.prefix + (this.isSecondary ? this.tempIndex !== 0 ? 'S' : '' : '') + (this.tempIndex !== 0 ? this.tempIndex : ''))]);
        }
    }

    getClassForIndex(index: number): any {
        if (index === 0 && ImageUtils.getAtlasClass(this.assetClass).Frames[this.prefix]) {
            return ImageUtils.getAtlasClass(this.assetClass);
        }
        else if (ImageUtils.getAtlasClass(this.assetClass).Frames[this.prefix + index]) {
            return ImageUtils.getAtlasClass(this.assetClass);
        }
        else if (ImageUtils.getAtlasClass(`${this.assetClass}2`) && ImageUtils.getAtlasClass(`${this.assetClass}2`).Frames[this.prefix + index]) {
            return ImageUtils.getAtlasClass(`${this.assetClass}2`);
        }
        else if (ImageUtils.getAtlasClass(`${this.assetClass}3`) && ImageUtils.getAtlasClass(`${this.assetClass}3`).Frames[this.prefix + index]) {
            return ImageUtils.getAtlasClass(`${this.assetClass}3`);
        }
        else if (ImageUtils.getAtlasClass(`${this.assetClass}4`) && ImageUtils.getAtlasClass(`${this.assetClass}4`).Frames[this.prefix + index]) {
            return ImageUtils.getAtlasClass(`${this.assetClass}4`);
        }
        return ImageUtils.getAtlasClass(this.assetClass);
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