export class GameConfig {

    public static GAME: Phaser.Game = null;
    public static SITE: Sites = null;
    public static ASSET_MODE: AssetMode = null;
    public static PUB_MODE: PublishMode = null;

    private static _inited: boolean = false;

    private static _site: string;
    private static _publisher: string;
    private static _gameId: string;

    private static _props = {};

    public static init(site: Sites, pmode: PublishMode, amode: AssetMode, gameTitle: string) {
        if (this._inited) return;

        this._inited = true;
        this.SITE = site;
        this.ASSET_MODE = amode;
        this.PUB_MODE = pmode;

        const url = (window.location !== window.parent.location)
            ? document.referrer
            : document.location.href;

        this._publisher = this.getLocation(url);

        switch (site) {
            case Sites.FREE_GAMES_CASUAL:
            {
                this._site = 'http://www.freegamescasual.com';
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this._site = 'http://www.dressupmix.com';
                break;
            }
            case Sites.MY_CUTE_GAMES:
            {
                this._site = 'http://www.mycutegames.com';
                break;
            }
        }

        this._gameId = this.makeLinkId(gameTitle);
    }

    private static getLocation(href: string): string {
        const l = document.createElement('a');
        l.href = href;
        return l.hostname;
    }

    private static makeLinkId(title: string): string {
        let temp = title.toLocaleLowerCase();
        temp = temp.replace(' ', '_');
        temp = temp.replace('-', '_');
        return temp;
    }

    public static inMoreGamesUrl(): string {
        return `${this._site}/?utm_source=${this._publisher}&utm_campaign=${this._gameId}&utm_medium=referral&utm_content=ingame_more_games`;
    }

    public static preloaderLogoUrl(): string {
        return `${this._site}/?utm_source=${this._publisher}&utm_campaign=${this._gameId}&utm_medium=referral&utm_content=preloader_logo`;
    }

    public static preloaderCategoryUrl(): string {
        return `${this._site}/?utm_source=${this._publisher}&utm_campaign=${this._gameId}&utm_medium=referral&utm_content=preloader_category`;
    }

    public static mainLogoUrl(): string {
        return `${this._site}/?utm_source=${this._publisher}&utm_campaign=${this._gameId}&utm_medium=referral&utm_content=main_logo`;
    }

    public static mainMoreGamesUrl(): string {
        return `${this._site}/?utm_source=${this._publisher}&utm_campaign=${this._gameId}&utm_medium=referral&utm_content=main_more_games`;
    }
}

export enum Sites {
    MY_CUTE_GAMES,
    FREE_GAMES_CASUAL,
    DRESSUP_MIX
}

export enum PublishMode {
    NORMAL,
    NO_BUTTONS,
    NO_BUTTONS_ONE_AD,
    NO_AD,
    GAME_DISTRIBUTIONS
}

export enum AssetMode {
    LOAD_ALL,
    LOAD_BACKGROUND,
    LOAD_BEFORE
}
