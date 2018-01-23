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

export default class Result1 extends Phaser.State {

    private NEXT = 'Dress2';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;
    private container: Phaser.Group = null;
    private txt: Phaser.Text = null;
    private bg: Phaser.Sprite = null;
    private fg: Phaser.Sprite = null;
    private playBtn: Phaser.Button = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private score: number = 0;
    private splitter: number = 0;
    private animate: boolean = false;

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
        this.score = 0;
        this.splitter = 0;
        this.animate = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.container = this.game.add.group();
        this.bg = this.game.add.sprite(99, 70, ImageUtils.getImageClass('ImagesBg4').getName());
        this.container.add(this.bg);

        this.container.add(GameConfig.DOLL_1.getBody());
        GameConfig.DOLL_1.setPosition(176, 114);

        this.game.add.sprite(493, 86,
            ImageUtils.getAtlasClass('AtlasesCommons').getName(),
            ImageUtils.getAtlasClass('AtlasesCommons').Frames.Gramm,
            this.container
        );
        const p1 = this.game.add.sprite(503 + 500, 146,
            ImageUtils.getAtlasClass('AtlasesStateResult1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult1').Frames.Post1,
            this.container
        );
        const p2 = this.game.add.sprite(503 + 500, 216,
            ImageUtils.getAtlasClass('AtlasesStateResult1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult1').Frames.Post2,
            this.container
        );
        const p3 = this.game.add.sprite(503 + 500, 286,
            ImageUtils.getAtlasClass('AtlasesStateResult1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult1').Frames.Post3,
            this.container
        );
        const p4 = this.game.add.sprite(503 + 500, 355,
            ImageUtils.getAtlasClass('AtlasesStateResult1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult1').Frames.Post4,
            this.container
        );
        const p5 = this.game.add.sprite(503 + 500, 425,
            ImageUtils.getAtlasClass('AtlasesStateResult1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult1').Frames.Post5,
            this.container
        );
        const p6 = this.game.add.sprite(503 + 500, 495,
            ImageUtils.getAtlasClass('AtlasesStateResult1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateResult1').Frames.Post6,
            this.container
        );
        this.game.add.sprite(512, 587,
            ImageUtils.getAtlasClass('AtlasesCommons').getName(),
            ImageUtils.getAtlasClass('AtlasesCommons').Frames.Heart,
            this.container
        );
        const style = { font: '35px Arial Black', fill: '#FF205D', align: 'left' };
        this.txt = this.game.add.text(548, 578, '0', style, this.container);

        this.fg = this.game.add.sprite(0, 0,
            ImageUtils.getAtlasClass('AtlasesCommons').getName(),
            ImageUtils.getAtlasClass('AtlasesCommons').Frames.Fg);

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            this.gui.addExtraMoreAnimated(812, 514,
                ImageUtils.getSpritesheetClass('SpritesheetsMoreE1482068').getName(),
                [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
        }
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this, 479, 592);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.slideIn(p1, 503, 750, 1000);
        TweenUtils.slideIn(p2, 503, 750, 1250);
        TweenUtils.slideIn(p3, 503, 750, 1500);
        TweenUtils.slideIn(p4, 503, 750, 1750);
        TweenUtils.slideIn(p5, 503, 750, 2000);
        TweenUtils.slideIn(p6, 503, 750, 2250);
        TweenUtils.delayedCall(3000, () => {
            this.animate = true;
        }, this);

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
        if (this.animate) {
            this.splitter++;
            if (this.splitter % 3 === 0) {
                this.score += this.game.rnd.between(25000, 30000);
                this.txt.setText(this.score.toString());
                this.txt.update();
            }
            if (this.splitter === 120) {
                this.animate = false;
                TweenUtils.fadeAndScaleIn(this.playBtn, 750);
            }
        }
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        this.fg.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
        GameConfig.CONT_1 = this.container;
        this.game.world.remove(this.container);
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

