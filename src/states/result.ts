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
import {LaserType} from './spec-effects/laser/enum.laser';
import {ILaser} from './spec-effects/laser/i.laser';
import {IParticle} from './spec-effects/particle/i.particle';
import {FallParticles} from './spec-effects/particle/fall.particle';
import {IFirework} from './spec-effects/firework/i.firework';
import {SimpleFirework} from './spec-effects/firework/simple.firework';

export default class Result extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private laser: ILaser = null;
    private particle: IParticle = null;
    private firework: IFirework = null;
    private bg: Phaser.Sprite = null;
    private spl: Phaser.Sprite = null;
    private likes: Phaser.Sprite = null;
    private txt: Phaser.Text = null;
    private btnContainer: Phaser.Group = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.RESULT_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.RESULT_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.RESULT_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesFon' + GameConfig.SELECTED_BG).getName());

        this.laser = EffectUtils.makeLaser(LaserType.PENTA_LASER);
        this.laser.init(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light3,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light4,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light5,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light6,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Light7,
            ]);
        this.laser.start();

        this.firework = new SimpleFirework();
        this.firework.init(
            ImageUtils.getAtlasClass('AtlasesStateResult').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult').Frames.Firework);
        this.firework.start();

        this.particle = new FallParticles(1, 1.15);
        this.particle.init(ImageUtils.getAtlasClass('AtlasesEffects').getName(), [
            ImageUtils.getAtlasClass('AtlasesEffects').Frames.Con5,
            ImageUtils.getAtlasClass('AtlasesEffects').Frames.Con6,
        ], 250);
        this.particle.start();

        if (GameConfig.GAME_RESULT === 2) {
            this.spl = this.game.add.sprite(107, -45,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gl1);
            this.spl.scale.setTo(.7);
            GameConfig.DOLL_3.insert();
            GameConfig.DOLL_1.insert();
            GameConfig.DOLL_1.setPosition(262, 66);
            GameConfig.DOLL_3.setPosition(334, 34);
        } else {
            this.spl = this.game.add.sprite(152, 11,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gl2);
            this.spl.scale.setTo(.6);
            GameConfig.DOLL_4.insert();
            GameConfig.DOLL_2.insert();
            GameConfig.DOLL_4.setPosition(244, 76);
            GameConfig.DOLL_2.setPosition(204, 72);
        }

        this.likes = this.game.add.sprite(328, 615,
            ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShow').Frames.Likes);
        this.txt = this.game.add.text(
            515, 665, '100000', {
                font: '60px ' + ImageUtils.getGoogleFontClass('Anton'),
                fill: '#fff'
            });
        this.txt.anchor.setTo(0.5);

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW, true);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(
                960 - 157, 720 - 157,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621624').getName(), 5, true,
                GuiUtils.addOverHandler,
                GuiUtils.addOutHandler
            );
        }
        const playBtn = this.gui.addPlayBtn(this.nextState);
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
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadFinalState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        if (GameConfig.PUB_MODE === PublishMode.NORMAL ||
            GameConfig.PUB_MODE === PublishMode.NO_BUTTONS) {
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, AdUtils.playAds, this);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.likes) this.bg.destroy(true);
        if (this.txt) this.bg.destroy(true);
        if (this.spl) this.bg.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_2.dispose();
        GameConfig.DOLL_3.dispose();
        GameConfig.DOLL_4.dispose();
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

