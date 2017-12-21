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

export default class Comix2 extends Phaser.State {

    private NEXT = 'Dress1';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private block1: Phaser.Sprite = null;
    private block2: Phaser.Sprite = null;
    private block3: Phaser.Sprite = null;
    private block4: Phaser.Sprite = null;
    private block5: Phaser.Sprite = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
    private moreBtn: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private phase: number = 0;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.COMIX_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.COMIX_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.COMIX_STATE);
                break;
            }
        }
        this.phase = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        this.block1 = this.game.add.sprite(520, 16,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Col1);
        this.block2 = this.game.add.sprite(473, 178,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Col2);
        this.block3 = this.game.add.sprite(198, 241,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Col3);
        this.block4 = this.game.add.sprite(377, 366,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Col4);
        this.block5 = this.game.add.sprite(240, 527,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Col5);
        GuiUtils.centrize(this.block1);
        GuiUtils.centrize(this.block2);
        GuiUtils.centrize(this.block3);
        GuiUtils.centrize(this.block4);
        GuiUtils.centrize(this.block5);
        this.block1.alpha = 0;
        this.block2.alpha = 0;
        this.block3.alpha = 0;
        this.block4.alpha = 0;
        this.block5.alpha = 0;
        this.block1.scale.setTo(0);
        this.block2.scale.setTo(0);
        this.block3.scale.setTo(0);
        this.block4.scale.setTo(0);
        this.block5.scale.setTo(0);

        this.girl1 = this.game.add.sprite(0 - 700, 50,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr1);
        this.girl2 = this.game.add.sprite(639 + 700, 64,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Gr2);
        this.cloud1 = this.game.add.sprite(195, 15,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Cl1);
        this.cloud2 = this.game.add.sprite(445, 422,
            ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
            ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Cl2);
        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.moreBtn = this.gui.addExtraMore(
                960 - 191, 720 - 148,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE2,
            );
            this.addAnimation(this.moreBtn);
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextMore, this);
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
        // ONLY FOR START STATE !!!!!!!!!!!!!!!!!
        if (!GameConfig.GAME_COMPLETED)
            this.game.camera.flash(0x000000, 1000);

        // Animations goes here
        TweenUtils.slideIn(this.girl1, 0, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeIn(this.cloud1, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(this.block1, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3.3);
        TweenUtils.fadeAndScaleIn(this.block2, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3.6);
        TweenUtils.fadeAndScaleIn(this.block3, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3.9);
        TweenUtils.fadeAndScaleIn(this.block4, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 4.2);
        TweenUtils.fadeAndScaleIn(this.block5, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 4.5);
        TweenUtils.slideIn(this.girl2, 639, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 5);
        TweenUtils.fadeIn(this.cloud2, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 6);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 7);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // Loads
            PreloaderUtils.preloadDress1State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private counter: number = 0;
    private sp1: Phaser.Sprite = null;
    private sp2: Phaser.Sprite = null;
    private sp3: Phaser.Sprite = null;
    private sp4: Phaser.Sprite = null;
    private addAnimation(sprite) {
        this.sp1 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp1);
        this.sp2 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp2);
        this.sp3 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp3);
        this.sp4 = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Sp4);
        this.sp1.alpha = 0;
        this.sp2.alpha = 0;
        this.sp3.alpha = 0;
        this.sp4.alpha = 0;
        this.sp1.anchor.setTo(.5);
        this.sp2.anchor.setTo(.5);
        this.sp3.anchor.setTo(.5);
        this.sp4.anchor.setTo(.5);
        sprite.addChild(this.sp1);
        sprite.addChild(this.sp2);
        sprite.addChild(this.sp3);
        sprite.addChild(this.sp4);
    }
    private nextMore() {
        this.counter++;
        if (this.counter > 1) this.counter = 0;
        if (this.counter === 1) {
            this.moreBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE);
            const t1 = this.game.add.tween(this.sp1).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, true).yoyo(true);
            const t2 = this.game.add.tween(this.sp2).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            const t3 = this.game.add.tween(this.sp3).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            const t4 = this.game.add.tween(this.sp4).to({ alpha: 1 }, Phaser.Timer.SECOND * .15, Phaser.Easing.Linear.None, false).yoyo(true);
            t1.chain(t2);
            t2.chain(t3);
            t3.chain(t4);
            this.game.time.events.add(Phaser.Timer.SECOND *  2, this.nextMore, this);
        }
        else if (this.counter === 0) {
            this.moreBtn.loadTexture(
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE2);
            this.game.time.events.add(Phaser.Timer.SECOND *  3, this.nextMore, this);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.block1) this.block1.destroy(true);
        if (this.block2) this.block2.destroy(true);
        if (this.block3) this.block3.destroy(true);
        if (this.block4) this.block4.destroy(true);
        if (this.block5) this.block5.destroy(true);
        if (this.girl1) this.girl1.destroy(true);
        if (this.girl2) this.girl2.destroy(true);
        if (this.cloud1) this.cloud1.destroy(true);
        if (this.cloud2) this.cloud2.destroy(true);

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

