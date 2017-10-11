import {FilterUtils} from './filter.utils';
import {GameConfig} from '../config/game.config';
import {ISaver} from '../states/saver/i.saver';
import {DefaultSaver} from '../states/saver/default.saver';
import {SaverTemplates} from '../states/saver/enum.saver';
import {VerticalSaver} from '../states/saver/vertical.saver';

export class GuiUtils {
    public static getSaver(): ISaver {
        let saver;

        switch (GameConfig.SAVER_MODE) {
            case SaverTemplates.V_FADE_SLIDER_TEMPLATE: {
                saver = new VerticalSaver();
                break;
            }
            case SaverTemplates.CUSTOM: {
                saver = new DefaultSaver();
                break;
            }
            case SaverTemplates.NONE: {
                saver = null;
                break;
            }
        }

        return saver;
    }

    public static makeButton(
        parent: Phaser.State, container: Phaser.Group,
        x: number, y: number, scale: number = 1,
        name: string = '', res: string = '', states: Array<any> = [0, 0, 0],
        enabled: boolean = true, perfect: boolean = false, visible: boolean = true,
        clickHandler: Function = null, overHandler: Function = null, outHandler: Function = null, downHandler: Function = null, upHandler: Function = null): Phaser.Button {

        let tempItem = parent.game.add.button(0, 0, res, null, parent, states[0], states[1], states[2]);

        tempItem.name = name;
        tempItem.anchor.set(0.5);
        tempItem.inputEnabled = true;

        if (perfect)
            tempItem.input.pixelPerfectClick = tempItem.input.pixelPerfectOver = perfect;
        if (perfect)
            tempItem.input.pixelPerfectAlpha = 10;
        if (perfect)
            tempItem.input.useHandCursor = true;

        tempItem.inputEnabled = enabled;

        if (clickHandler != null)
            tempItem.events.onInputUp.add(clickHandler, parent);
        if (overHandler != null)
            tempItem.events.onInputOver.add(overHandler, parent);
        if (outHandler != null)
            tempItem.events.onInputOut.add(outHandler, parent);
        if (downHandler != null)
            tempItem.events.onInputDown.add(downHandler, parent);
        if (upHandler != null)
            tempItem.events.onInputUp.add(upHandler, parent);

        if (scale)
            tempItem.scale.setTo(scale);

        tempItem.visible = visible;
        tempItem.x = x + tempItem.width / 2;
        tempItem.y = y + tempItem.height / 2;

        container.addChild(tempItem);

        return tempItem;
    }

    public static addOverHandlerMcg(sprite) {
        sprite.filters = [FilterUtils.makeFilter(GameConfig.GAME)];
        const _tween1 = GameConfig.GAME.add.tween(sprite).to({ angle: 10 }, 400, Phaser.Easing.Linear.None, true);
        const _tween2 = GameConfig.GAME.add.tween(sprite).to({ angle: -10 }, 800, Phaser.Easing.Linear.None, false);
        const _tween3 = GameConfig.GAME.add.tween(sprite).to({ angle: 0 }, 400, Phaser.Easing.Linear.None, false);
        _tween1.chain(_tween2);
        _tween2.chain(_tween3);
        _tween3.chain(_tween1);
    }

    public static addOutHandlerMcg(sprite) {
        sprite.filters = null;
        GameConfig.GAME.tweens.removeFrom(sprite);
        sprite.angle = 0;
    }

    public static addOverHandler(sprite) {
        sprite.filters = [FilterUtils.makeFilter(GameConfig.GAME)];
        GameConfig.GAME.tweens.removeFrom(sprite.scale);
        GameConfig.GAME.add.tween(sprite.scale).to({ x: 1.03, y: 1.03 }, 250, Phaser.Easing.Linear.None, true);
    }

    public static addOutHandler(sprite) {
        sprite.filters = null;
        GameConfig.GAME.tweens.removeFrom(sprite.scale);
        GameConfig.GAME.add.tween(sprite.scale).to({ x: 1, y: 1 }, 250, Phaser.Easing.Linear.None, true);
    }

    public static addOverHandlerFgc(sprite) {
        sprite.filters = [FilterUtils.makeFilter(GameConfig.GAME)];
        GameConfig.GAME.tweens.removeFrom(sprite.scale);
        GameConfig.GAME.add.tween(sprite.scale).to({ x: .82, y: .82 }, 250, Phaser.Easing.Linear.None, true);
    }

    public static addOutHandlerFgc(sprite) {
        sprite.filters = null;
        GameConfig.GAME.tweens.removeFrom(sprite.scale);
        GameConfig.GAME.add.tween(sprite.scale).to({ x: .8, y: .8 }, 250, Phaser.Easing.Linear.None, true);
    }

    public static goLinkInMoreGames() {
        window.open(GameConfig.inMoreGamesUrl());
    }

    public static goLinkPreloaderLogo() {
        window.open(GameConfig.preloaderLogoUrl());
    }

    public static goLinkPreloaderCategory() {
        window.open(GameConfig.preloaderCategoryUrl());
    }

    public static goLinkMainLogo() {
        window.open(GameConfig.mainLogoUrl());
    }

    public static goLinkMainMoreGames() {
        window.open(GameConfig.mainMoreGamesUrl());
    }
}
