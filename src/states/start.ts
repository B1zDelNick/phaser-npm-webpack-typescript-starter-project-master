import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {EffectUtils} from '../utils/effect.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {ILaser} from './spec-effects/laser/i.laser';
import {PreloaderUtils} from '../utils/preloader.utils';
import {IParticle} from './spec-effects/particle/i.particle';
import {FallParticles} from './spec-effects/particle/fall.particle';
import {BubbleParticles} from './spec-effects/particle/bubble.particle';
import {SnowBackParticles} from './spec-effects/particle/snow.back.particle';
import {SnowMiddleParticles} from './spec-effects/particle/snow.middle.particle';
import {SnowFrontParticles} from './spec-effects/particle/snow.front.particle';

export default class Start extends Phaser.State {

    private NEXT = 'Comix';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;
    private snowB: IParticle = null;
    private snowM: IParticle = null;
    private snowF: IParticle = null;
    private bg: Phaser.Sprite = null;
    private sp1: Phaser.Sprite = null;
    private sp2: Phaser.Sprite = null;
    private sp3: Phaser.Sprite = null;
    private sp4: Phaser.Sprite = null;
    private sp5: Phaser.Sprite = null;
    private sp6: Phaser.Sprite = null;
    private sp7: Phaser.Sprite = null;
    private sp8: Phaser.Sprite = null;
    private sp9: Phaser.Sprite = null;
    private sp10: Phaser.Sprite = null;
    private sp11: Phaser.Sprite = null;
    private sp12: Phaser.Sprite = null;
    private girl: Phaser.Sprite = null;
    private title: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private phase: number = -1;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.START_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.START_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.START_STATE);
                break;
            }
        }
        this.phase = -1;
    }

    public preload(): void {
    }

    public create(): void {
        /*const ct = this.game.add.group();
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName(), null, ct);
        const bmdSrc = this.game.add.bitmapData(this.game.width, this.game.height);
        this.game.stage.updateTransform();
        bmdSrc.drawGroup(ct); //  this.game.world);
        const bmd = this.game.make.bitmapData(this.game.width, this.game.height);
        bmd.alphaMask(bmdSrc, 'mask');
        this.game.add.image(0, 0, bmd);
        ct.visible = false;*/
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        this.snowB = new SnowBackParticles();
        this.snowB.init(null, null);
        this.snowB.start();
        this.snowM = new SnowMiddleParticles();
        this.snowM.init(null, null);
        this.snowM.start();
        this.snowF = new SnowFrontParticles();
        this.snowF.init(null, null);
        this.snowF.start();

        this.sp1 = this.game.add.sprite(25, 237,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
        this.sp2 = this.game.add.sprite(173, 65,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
        this.sp3 = this.game.add.sprite(296, 22,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
        this.sp4 = this.game.add.sprite(386, 30,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
        this.sp5 = this.game.add.sprite(495, 22,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
        this.sp6 = this.game.add.sprite(631, 42,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
        this.sp7 = this.game.add.sprite(594, 217,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
        this.sp8 = this.game.add.sprite(855, 76,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
        this.sp9 = this.game.add.sprite(913, 185,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
        this.sp10 = this.game.add.sprite(578, 643,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
        this.sp11 = this.game.add.sprite(383, 660,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
        this.sp12 = this.game.add.sprite(173, 618,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
        this.sp1.alpha = 0;
        this.sp2.alpha = 0;
        this.sp3.alpha = 0;
        this.sp4.alpha = 0;
        this.sp5.alpha = 0;
        this.sp6.alpha = 0;
        this.sp7.alpha = 0;
        this.sp8.alpha = 0;
        this.sp9.alpha = 0;
        this.sp10.alpha = 0;
        this.sp11.alpha = 0;
        this.sp12.alpha = 0;
        for (let i = 0; i < 12; i++) {
            TweenUtils.delayedCall(this.game.rnd.between(0, 300), () => {
                this['sp' + (i + 1)].scale.setTo(1.25);
                EffectUtils.makeAlphaAnimation(this['sp' + (i + 1)], 1, this.game.rnd.between(350, 550));
            }, this);
        }

        this.girl = this.game.add.sprite(478, 75,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Girl1);
        this.title = this.game.add.sprite(15, 66,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Title);
        GuiUtils.centrize(this.title);
        this.title.alpha = 0;
        this.title.scale.setTo(0);

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(759, 570,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE2121565').getName(),
                [0, 1, 2, 3, 4, 5], 8, true);
        }
        const playBtn = this.gui.addPlayBtn(this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this, 479, 592);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }
        // ONLY FOR START STATE !!!!!!!!!!!!!!!!!
        if (!GameConfig.GAME_COMPLETED)
            this.game.camera.flash(0x000000, 1000);

        // Animations goes here
        TweenUtils.fadeAndScaleIn(this.title, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
            TweenUtils.customFadeAndScaleIn(playBtn, 1, 1.3, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
            EffectUtils.makeLightRotateAnimation(this.title, 1100, 4);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // Loads
            PreloaderUtils.preloadComixState();
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

