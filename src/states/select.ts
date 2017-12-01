import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {EffectUtils} from '../utils/effect.utils';
import {AdUtils} from '../utils/ad/ad.utils';
import {SoundUtils} from '../utils/sound/sound.utils';

export default class Select extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private glow1: Phaser.Sprite = null;
    private glow2: Phaser.Sprite = null;
    private glow3: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
    private container: Phaser.Group = null;
    private sel1: Phaser.Button = null;
    private sel2: Phaser.Button = null;
    private sel3: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private phase: number = 0;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.SELECT_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.SELECT_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.SELECT_STATE);
                break;
            }
        }
        if (GameConfig.CURRENT_STATE === 0) this.NEXT = 'Dress1';
        if (GameConfig.CURRENT_STATE === 1) this.NEXT = 'Dress3';
        if (GameConfig.CURRENT_STATE === 2) this.NEXT = 'Dress2';
        this.phase = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg2').getName());

        this.glow1 = this.game.add.sprite(173, 25,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr12);
        this.glow2 = this.game.add.sprite(361, 16,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr22);
        this.glow3 = this.game.add.sprite(559, 26,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr32);

        this.container = this.game.add.group();

        this.sel1 = GuiUtils.makeButton(
            this, this.container, 173 + 700, 25, 1,
            'sel1', ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr11,
            GameConfig.CURRENT_STATE === 0, true, true,
            this.nextState, null, null
        );
        this.sel2 = GuiUtils.makeButton(
            this, this.container, 361 + 700, 16, 1,
            'sel2', ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr21,
            GameConfig.CURRENT_STATE === 1, true, true,
            this.nextState, null, null
        );
        this.sel3 = GuiUtils.makeButton(
            this, this.container, 559 + 700, 26, 1,
            'sel3', ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr31,
            GameConfig.CURRENT_STATE === 2, true, true,
            this.nextState, null, null
        );

        this.cloud1 = this.game.add.sprite(329, 163,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Cl1);
        this.cloud2 = this.game.add.sprite(329, 163,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Cl2);

        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;
        this.glow1.alpha = 0;
        this.glow2.alpha = 0;
        this.glow3.alpha = 0;

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW, true);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(770, 535,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE21720925').getName(),
                null, 8, true);
        }
        const playBtn = this.gui.addPlayBtn(() => {
            if (this.phase === 0) {
                TweenUtils.fadeAndScaleOut(playBtn);
                TweenUtils.fadeOut(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * .5);
                TweenUtils.fadeIn(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.5);
                TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
                this.phase++;
            }
            else if (this.phase === 1) {
                TweenUtils.fadeAndScaleOut(playBtn);
                TweenUtils.fadeOut(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * .5, () => {
                    if (GameConfig.CURRENT_STATE === 0) EffectUtils.makeAlphaAnimation(this.glow1, 1, Phaser.Timer.SECOND * 1);
                    if (GameConfig.CURRENT_STATE === 1) EffectUtils.makeAlphaAnimation(this.glow2, 1, Phaser.Timer.SECOND * 1);
                    if (GameConfig.CURRENT_STATE === 2) EffectUtils.makeAlphaAnimation(this.glow3, 1, Phaser.Timer.SECOND * 1);
                    if (GameConfig.CURRENT_STATE !== 0) {
                        this.sel1.loadTexture(
                            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
                            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr13);
                    }
                    if (GameConfig.CURRENT_STATE !== 1) {
                        this.sel2.loadTexture(
                            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
                            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr23);
                    }
                    if (GameConfig.CURRENT_STATE !== 2) {
                        this.sel3.loadTexture(
                            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
                            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr33);
                    }
                }, this);
            }
        });
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        if (GameConfig.CURRENT_STATE === 0) {
            TweenUtils.slideIn(this.sel1, 304, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
            TweenUtils.slideIn(this.sel2, 495, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1.5);
            TweenUtils.slideIn(this.sel3, 693, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
            TweenUtils.fadeIn(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
            TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3.5);
        }
        else {
            this.sel1.position.x = 304;
            this.sel2.position.x = 495;
            this.sel3.position.x = 693;
            if (GameConfig.CURRENT_STATE === 0) EffectUtils.makeAlphaAnimation(this.glow1, 1, Phaser.Timer.SECOND * 1);
            if (GameConfig.CURRENT_STATE === 1) EffectUtils.makeAlphaAnimation(this.glow2, 1, Phaser.Timer.SECOND * 1);
            if (GameConfig.CURRENT_STATE === 2) EffectUtils.makeAlphaAnimation(this.glow3, 1, Phaser.Timer.SECOND * 1);
            if (GameConfig.CURRENT_STATE !== 0) {
                this.sel1.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr13);
            }
            if (GameConfig.CURRENT_STATE !== 1) {
                this.sel2.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr23);
            }
            if (GameConfig.CURRENT_STATE !== 2) {
                this.sel3.loadTexture(
                    ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr33);
            }
        }

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            if (GameConfig.CURRENT_STATE === 0) PreloaderUtils.preloadDecorState();
            if (GameConfig.CURRENT_STATE === 1) PreloaderUtils.preloadDress1State();
            if (GameConfig.CURRENT_STATE === 2) PreloaderUtils.preloadDress2State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        if (GameConfig.PUB_MODE === PublishMode.NORMAL || GameConfig.PUB_MODE === PublishMode.NO_BUTTONS) {
            AdUtils.playAds();
        }
        else if (GameConfig.PUB_MODE === PublishMode.NO_BUTTONS_ONE_AD && GameConfig.CURRENT_STATE === 1) {
            AdUtils.playAds();
        }
        else if (GameConfig.PUB_MODE === PublishMode.DUW && GameConfig.CURRENT_STATE === 1) {
            AdUtils.playAds();
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.bg.destroy(true);
        this.sel1.destroy(true);
        this.sel2.destroy(true);
        this.sel3.destroy(true);
        this.container.destroy(true);
        this.cloud1.destroy(true);
        this.cloud2.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        if (this.saver) {
            this.saver.setOnOutCallback(() => {
                this.game.time.events.removeAll();
                this.game.tweens.removeAll();
                this.reallyGoNextState(true);
            });
            this.saver.fadeOut();
        } else {
            this.blocker = this.game.add.graphics(0, 0);
            this.blocker.beginFill(0);
            this.blocker.drawRect(0, 0, 960, 720);
            this.blocker.inputEnabled = true;
            this.blocker.alpha = 0;
            this.game.camera.onFadeComplete.addOnce(() => {
                this.game.time.events.removeAll();
                this.game.tweens.removeAll();
                this.game.camera.fade(0x000000, 1, true, 0);
                this.blocker.alpha = .85;
                this.reallyGoNextState(true);
            }, this);
            this.game.camera.fade(0x000000, 500, true, .85);
        }
    }

    private reallyGoNextState(addLoader: boolean = false): void {
        if (this.nextPrepared) {
            this.game.state.start(this.NEXT);
        } else {
            if (addLoader) {
                this.spinner = this.game.add.sprite(
                    this.game.world.centerX,
                    this.game.world.centerY,
                    ImageUtils.getImageClass('ImagesSpin').getName());
                this.spinner.anchor.setTo(.5, .5);
                // this.spinner.scale.setTo(.5);
                TweenUtils.rotate(this.spinner, 360, Phaser.Timer.SECOND * 1, 0, -1);
            }
            this.game.time.events.add(Phaser.Timer.SECOND *  .25, this.reallyGoNextState, this);
        }
    }
}

