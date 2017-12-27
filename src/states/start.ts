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

export default class Start extends Phaser.State {

    private NEXT = 'Decor';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private title: Phaser.Sprite = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private g1: Phaser.Sprite = null;
    private g2: Phaser.Sprite = null;
    private g3: Phaser.Sprite = null;
    private moreB: Phaser.Button = null;
    private moreState: number = 0;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private phase: number = 0;

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
        this.phase = 0;
        this.moreState = -1;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        this.girl1 = this.game.add.sprite(343, 59,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gr1);
        this.girl2 = this.game.add.sprite(654, 59,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gr2);
        this.title = this.game.add.sprite(199, 392 - 700,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Title);
        GuiUtils.centrize(this.title);

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.moreB = this.gui.addExtraMore(960 - 173, 720 - 173,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE);
            this.g1 = this.game.add.sprite(960 - 178 / 2, 720 - 188 / 2,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MGr1);
            this.g1.anchor.setTo(.5, 1);
            (this.moreB.parent as Phaser.Group).addAt(this.g1, 0);
            this.g2 = this.game.add.sprite(960 - 168 / 2, 720 - 188 / 2,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MGr2);
            this.g2.anchor.setTo(.5, 1);
            (this.moreB.parent as Phaser.Group).addAt(this.g2, 0);
            this.g3 = this.game.add.sprite(960 - 168 / 2, 720 - 188 / 2,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MGr3);
            this.g3.anchor.setTo(.5, 1);
            (this.moreB.parent as Phaser.Group).addAt(this.g3, 0);
            this.g1.scale.setTo(0);
            this.g2.scale.setTo(0);
            this.g3.scale.setTo(0);
            this.g1.alpha = 0;
            this.g2.alpha = 0;
            this.g3.alpha = 0;
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
        TweenUtils.moveIn(this.title, this.title.x, this.title.y + 700, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
            EffectUtils.makeMoveAnimation(this.title, this.title.x, this.title.y + 10, 1100);
        }, this);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75,
            GameConfig.GAME_COMPLETED ? Phaser.Timer.SECOND * 2 : Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // Loads
            PreloaderUtils.preloadComixState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private nextMore() {
        this.moreState++;
        if (this.moreState > 2) {
            this.moreState = 0;
        }
        if (this.moreState === 0) {
            TweenUtils.customFadeAndScaleIn(this.g1, 1, .75, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.fadeAndScaleOut(this.g1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
            }, this);
        }
        if (this.moreState === 1) {
            TweenUtils.customFadeAndScaleIn(this.g2, 1, .75, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.fadeAndScaleOut(this.g2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
            }, this);
        }
        if (this.moreState === 2) {
            TweenUtils.customFadeAndScaleIn(this.g3, 1, .75, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0, () => {
                TweenUtils.fadeAndScaleOut(this.g3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2);
            }, this);
        }
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 5, this.nextMore, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.title) this.title.destroy(true);
        if (this.girl1) this.girl1.destroy(true);
        if (this.girl2) this.girl2.destroy(true);
        if (this.g1) this.g1.destroy(true);
        if (this.g2) this.g2.destroy(true);
        if (this.g3) this.g3.destroy(true);

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

