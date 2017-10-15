import 'p2';
import 'pixi';
import 'phaser';

import * as WebFontLoader from 'webfontloader';

import Boot from './states/boot';
import Preloader from './states/preloader';
import * as Utils from './utils/utils';
import * as Assets from './assets';
import Start from './states/start';
import {AssetMode, GameConfig, PublishMode, Sites} from './config/game.config';
import {SaverTemplates} from './states/saver/enum.saver';
import Comix from './states/comix';
import Dress1 from './states/dress1';
import Dress2 from './states/dress2';
import Dress3 from './states/dress3';
import Final from './states/final';

class App extends Phaser.Game {
    constructor(config: Phaser.IGameConfig) {
        super (config);

        GameConfig.init(
            Sites.FREE_GAMES_CASUAL,
            PublishMode.NORMAL,
            AssetMode.LOAD_ALL,
            SaverTemplates.NONE,
            'Cinderellas Bridal Fashion Collection');

        this.state.add('Boot', Boot);
        this.state.add('Preloader', Preloader);
        this.state.add('Start', Start);
        this.state.add('Comix', Comix);
        this.state.add('Dress1', Dress1);
        this.state.add('Dress2', Dress2);
        this.state.add('Dress3', Dress3);
        this.state.add('Final', Final);

        this.state.start('Boot');
    }
}

function startApp(): void {
    let gameWidth: number = DEFAULT_GAME_WIDTH;
    let gameHeight: number = DEFAULT_GAME_HEIGHT;

    if (SCALE_MODE === 'USER_SCALE') {
        let screenMetrics: Utils.ScreenMetrics = Utils.ScreenUtils.calculateScreenMetrics(gameWidth, gameHeight);

        gameWidth = screenMetrics.gameWidth;
        gameHeight = screenMetrics.gameHeight;
    }

    // There are a few more options you can set if needed, just take a look at Phaser.IGameConfig
    let gameConfig: Phaser.IGameConfig = {
        width: gameWidth,
        height: gameHeight,
        renderer: Phaser.AUTO,
        parent: 'game-container',
        resolution: 1,
        transparent: true
    };

    let app = new App(gameConfig);
}

window.onload = () => {
    let webFontLoaderOptions: any = null;
    let webFontsToLoad: string[] = GOOGLE_WEB_FONTS;

    if (webFontsToLoad.length > 0) {
        webFontLoaderOptions = (webFontLoaderOptions || {});

        webFontLoaderOptions.google = {
            families: webFontsToLoad
        };
    }

    if (Object.keys(Assets.CustomWebFonts).length > 0) {
        webFontLoaderOptions = (webFontLoaderOptions || {});

        webFontLoaderOptions.custom = {
            families: [],
            urls: []
        };

        for (let font in Assets.CustomWebFonts) {
            webFontLoaderOptions.custom.families.push(Assets.CustomWebFonts[font].getFamily());
            webFontLoaderOptions.custom.urls.push(Assets.CustomWebFonts[font].getCSS());
        }
    }

    if (webFontLoaderOptions === null) {
        // Just start the game, we don't need any additional fonts
        startApp();
    } else {
        // Load the fonts defined in webFontsToLoad from Google Web Fonts, and/or any Local Fonts then start the game knowing the fonts are available
        webFontLoaderOptions.active = startApp;

        WebFontLoader.load(webFontLoaderOptions);
    }
};
