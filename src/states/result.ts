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

export default class Result extends Phaser.State {

    private NEXT = 'Final';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private particle: IParticle = null;
    private bg: Phaser.Sprite = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private label: Phaser.Sprite = null;
    private btnContainer: Phaser.Group = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private total: number = 0;

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
        this.total = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        this.particle = new FallParticles(.5, 1);
        this.particle.init(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Dot1,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Dot2,
            ]);
        this.particle.start();

        this.girl1 = this.game.add.sprite(5, 50,
            ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShow').Frames.Gr1);
        this.girl2 = this.game.add.sprite(713, 65,
            ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShow').Frames.Gr2);

        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_3.insert();

        GameConfig.DOLL_1.setPosition(206, 67);
        GameConfig.DOLL_2.setPosition(769, 58);
        GameConfig.DOLL_2.setScale(-1, 1);
        GameConfig.DOLL_3.setPosition(382, 57);

        this.btnContainer = this.game.add.group();
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                23 - 500, 400, 1,
                'btn1', ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
                ImageUtils.getAtlasClass('AtlasesStateShow').Frames.AnBtn,
                true, true, true,
                () => {
                    this.total++;
                    TweenUtils.fadeAndScaleOut(this.btn2);
                    TweenUtils.fadeIn(this.girl2);
                    if (this.total === 2) {
                        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                    }
                },
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                23 - 500, 270, 1,
                'btn2', ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
                ImageUtils.getAtlasClass('AtlasesStateShow').Frames.ElBtn,
                true, true, true,
                () => {
                    this.total++;
                    TweenUtils.fadeAndScaleOut(this.btn1);
                    TweenUtils.fadeIn(this.girl1);
                    if (this.total === 2) {
                        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                    }
                },
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.label = this.game.add.sprite(130, 303 - 800, ImageUtils.getSpritesheetClass('SpritesheetsLabel5331767').getName());
        this.label.animations.add('neon', [0, 1, 2, 3, 4, 5, 6]);
        this.label.animations.play('neon', 10, true);

        this.girl1.alpha = 0;
        this.girl2.alpha = 0;

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW, true);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(770, 535,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE21720925').getName(),
                null, 8, true);
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
        TweenUtils.slideIn(this.btn1, 90, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.slideIn(this.btn2, 90, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1.5, () => {
            this.btn1.filters = [EffectUtils.makeGlowAnimation(0xff33ff, 500)];
            this.btn2.filters = [EffectUtils.makeGlowAnimation(0xff33ff, 500)];
        }, this);
        TweenUtils.moveIn(this.label, 130, 303, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadFinalState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.girl1) this.girl1.destroy(true);
        if (this.girl2) this.girl2.destroy(true);
        if (this.label) this.label.destroy(true);
        if (this.btn1) this.btn1.destroy(true);
        if (this.btn2) this.btn2.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);
        if (this.particle) this.particle.dispose();

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.extract();
        GameConfig.DOLL_2.extract();
        GameConfig.DOLL_3.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.CURRENT_STATE = 0;
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

