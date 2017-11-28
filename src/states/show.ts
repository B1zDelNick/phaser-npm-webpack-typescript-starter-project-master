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

export default class Show extends Phaser.State {

    private NEXT = 'Result';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private laser: ILaser = null;
    private bg: Phaser.Sprite = null;
    private beginBtn: Phaser.Button = null;
    private line: Phaser.Sprite = null;
    private win1: Phaser.Sprite = null;
    private win2: Phaser.Sprite = null;
    private likes1: Phaser.Sprite = null;
    private likes2: Phaser.Sprite = null;
    private spl1: Phaser.Sprite = null;
    private spl2: Phaser.Sprite = null;
    private txt1: Phaser.Text = null;
    private txt2: Phaser.Text = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private skipper: number = 0;
    private count: number = 0;
    private counting: boolean = false;

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
        this.skipper = 0;
        this.count = 0;
        this.counting = false;
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

        this.spl1 = this.game.add.sprite(417, 60,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gl1);
        this.spl2 = this.game.add.sprite(-37, 81,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gl2);
        this.spl1.scale.setTo(.6);
        this.spl2.scale.setTo(.6);

        GameConfig.DOLL_3.insert();
        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_4.insert();

        GameConfig.DOLL_1.setPosition(507 + 700, 101);
        GameConfig.DOLL_2.setPosition(5 - 700, 128);
        GameConfig.DOLL_3.setPosition(579 + 700, 70);
        GameConfig.DOLL_4.setPosition(45 - 700, 132);

        GameConfig.DOLL_1.setAlpha(1);
        GameConfig.DOLL_2.setAlpha(1);
        GameConfig.DOLL_3.setAlpha(1);
        GameConfig.DOLL_4.setAlpha(1);

        this.line = this.game.add.sprite(432, 0,
            ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShow').Frames.Line);
        this.likes1 = this.game.add.sprite(131, 615,
            ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShow').Frames.Likes);
        this.likes2 = this.game.add.sprite(534, 615,
            ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShow').Frames.Likes);
        this.win1 = this.game.add.sprite(49, 291,
            ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShow').Frames.Winners);
        this.win2 = this.game.add.sprite(515, 291,
            ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShow').Frames.Winners);
        this.win1.alpha = 0;
        this.win2.alpha = 0;
        this.spl1.alpha = 0;
        this.spl2.alpha = 0;

        this.txt1 = this.game.add.text(
            315, 665, '0', {
                font: '60px ' + ImageUtils.getGoogleFontClass('Anton'),
                fill: '#fff'
            });
        this.txt1.anchor.setTo(0.5);
        this.txt2 = this.game.add.text(
            720, 665, '0', {
                font: '60px ' + ImageUtils.getGoogleFontClass('Anton'),
                fill: '#fff'
            });
        this.txt2.anchor.setTo(0.5);

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
        this.beginBtn = this.gui.addExtraBtn(282, 13,
            ImageUtils.getAtlasClass('AtlasesStateShow').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShow').Frames.Label,
            () => {
                this.laser.start();
                TweenUtils.fadeAndScaleOut(this.beginBtn);
                TweenUtils.slideIn(GameConfig.DOLL_2.getBody(), 5);
                TweenUtils.slideIn(GameConfig.DOLL_4.getBody(), 45);
                TweenUtils.fadeIn(this.spl2, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1, () => {
                    EffectUtils.makeAlphaAnimation(this.spl2, .5, Phaser.Timer.SECOND * .5);
                    TweenUtils.slideIn(GameConfig.DOLL_1.getBody(), 507, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                    TweenUtils.slideIn(GameConfig.DOLL_3.getBody(), 579, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                    TweenUtils.fadeIn(this.spl1, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2, () => {
                        EffectUtils.makeAlphaAnimation(this.spl1, .5, Phaser.Timer.SECOND * .5);
                        this.counting = true;
                        TweenUtils.delayedCall(Phaser.Timer.SECOND * 3, () => {
                            this.counting = false;
                            GameConfig.GAME_RESULT = this.game.rnd.between(1, 2);
                            if (GameConfig.GAME_RESULT === 1) {
                                this.txt1.setText('100000');
                                this.txt2.setText(this.game.rnd.between(70000, 95000) + '');
                                TweenUtils.fadeIn(this.win1, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
                            }
                            else {
                                this.txt2.setText('100000');
                                this.txt1.setText(this.game.rnd.between(70000, 95000) + '');
                                TweenUtils.fadeIn(this.win2, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
                            }
                            TweenUtils.delayedCall(Phaser.Timer.SECOND * 4, this.nextState, this);
                        }, this);
                    }, this);
                }, this);
            },
            GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.beginBtn.scale.setTo(0);
        this.beginBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.fadeAndScaleIn(this.beginBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1, () => {
            EffectUtils.makeScaleAnimation(this.beginBtn);
        }, this);
        // TweenUtils.bounceIn(this.label, 142, 639, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    public update(): void {
        super.update(this.game);
        if (this.counting) {
            this.skipper++;
            if (this.skipper > 3) this.skipper = 0;
            if (this.skipper === 0) {
                this.count += this.game.rnd.between(500, 2000);
                this.txt1.setText(this.count + '');
                this.txt2.setText(this.count + '');
            }
        }
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.laser) this.laser.dispose();
        if (this.bg) this.bg.destroy(true);
        if (this.win1) this.win1.destroy(true);
        if (this.win2) this.win2.destroy(true);
        if (this.likes1) this.likes1.destroy(true);
        if (this.likes2) this.likes2.destroy(true);
        if (this.spl1) this.spl1.destroy(true);
        if (this.spl2) this.spl2.destroy(true);
        if (this.line) this.line.destroy(true);
        if (this.txt1) this.txt1.destroy(true);
        if (this.txt2) this.txt2.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.extract();
        GameConfig.DOLL_2.extract();
        GameConfig.DOLL_3.extract();
        GameConfig.DOLL_4.extract();
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

