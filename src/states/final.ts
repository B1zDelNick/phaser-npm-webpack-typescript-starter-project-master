import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {IParticle} from './spec-effects/particle/i.particle';
import {GoldStarParticles} from './spec-effects/particle/gold.star.particle';
import {EffectUtils} from '../utils/effect.utils';
import {FallParticles} from './spec-effects/particle/fall.particle';
import {LaserType} from './spec-effects/laser/enum.laser';
import {ILaser} from './spec-effects/laser/i.laser';

export default class Final extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private laser: ILaser = null;
    private stars: IParticle = null;
    private cross1: Phaser.Button = null;
    private cross2: Phaser.Button = null;
    private cross3: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;
    private fl1: Phaser.Sprite = null;
    private fl2: Phaser.Sprite = null;
    private fl3: Phaser.Sprite = null;
    private fl4: Phaser.Sprite = null;
    private fl5: Phaser.Sprite = null;
    private fl6: Phaser.Sprite = null;
    private fl7: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.FINAL_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.FINAL_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.FINAL_STATE);
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
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Luch1,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Luch2,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Luch3,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Luch4,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Luch5,
            ]);
        this.laser.getContainer().alpha = .5;
        this.laser.start();

        this.fl1 = this.game.add.sprite(0, 212,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Fl1);
        this.fl2 = this.game.add.sprite(166, 193,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Fl2);
        this.fl3 = this.game.add.sprite(639, 272,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Fl3);
        this.fl4 = this.game.add.sprite(570, 193,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Fl4);
        this.fl5 = this.game.add.sprite(571, 262,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Fl5);
        this.fl6 = this.game.add.sprite(127, 271,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Fl6);
        this.fl7 = this.game.add.sprite(69, 227,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Fl7);
        this.fl1.alpha = 0;
        this.fl2.alpha = 0;
        this.fl3.alpha = 0;
        this.fl4.alpha = 0;
        this.fl5.alpha = 0;
        this.fl6.alpha = 0;
        this.fl7.alpha = 0;

        TweenUtils.delayedCall(Phaser.Timer.SECOND * .2, () => {
            EffectUtils.makeAlphaAnimation(this.fl1, 1, 1000);
        }, this);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * .4, () => {
            EffectUtils.makeAlphaAnimation(this.fl2, 1, 900);
        }, this);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * .3, () => {
            EffectUtils.makeAlphaAnimation(this.fl3, 1, 1100);
        }, this);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * .1, () => {
            EffectUtils.makeAlphaAnimation(this.fl4, 1, 1200);
        }, this);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 0, () => {
            EffectUtils.makeAlphaAnimation(this.fl5, 1, 800);
        }, this);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * .8, () => {
            EffectUtils.makeAlphaAnimation(this.fl6, 1, 700);
        }, this);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
            EffectUtils.makeAlphaAnimation(this.fl7, 1, 500);
        }, this);

        this.stars = new FallParticles(1, 1);
        this.stars.init(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Con1,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Con2,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Con3,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Con4,
            ]);
        this.stars.start();

        GameConfig.DOLL_4.insert();
        GameConfig.DOLL_4.setPosition(289, -50);
        GameConfig.DOLL_3.insert();
        GameConfig.DOLL_3.setPosition(24, -61);

        this.btnContainer = this.game.add.group();
        this.cross1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                127, 465, 1,
                '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross1,
                true, true, true,
                GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Housewarming-Party-play.html'),
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.cross2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                356, 402, 1,
                '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross2,
                true, true, true,
                GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princesses-Red-Carpet-Gala-play.html'),
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.cross3 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                588, 465, 1,
                '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross3,
                true, true, true,
                GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Boho-Winter-with-Princesses-play.html'),
                GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.cross1.scale.setTo(0);
        this.cross1.alpha = 0;
        this.cross2.scale.setTo(0);
        this.cross2.alpha = 0;
        this.cross3.scale.setTo(0);
        this.cross3.alpha = 0;

        // GUI Buttons
        this.gui.addGui();
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
        TweenUtils.fadeAndScaleIn(this.cross1, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(this.cross2, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.5);
        TweenUtils.fadeAndScaleIn(this.cross3, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3);

        // Assets Managment starts here
        // Nothing to Load Here, just enjoy :)
        this.nextPrepared = true;
        if (!GameConfig.IS_ASSETS_LOADED)
            GameConfig.IS_ASSETS_LOADED = true;
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.laser) this.laser.dispose();
        if (this.stars) this.stars.dispose();
        if (this.bg) this.bg.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);
        if (this.cross1) this.cross1.destroy(true);
        if (this.cross2) this.cross2.destroy(true);
        if (this.cross3) this.cross3.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_2.dispose();
        GameConfig.DOLL_3.dispose();
        GameConfig.DOLL_4.dispose();
        GameConfig.DOLL_1 = null;
        GameConfig.DOLL_2 = null;
        GameConfig.DOLL_3 = null;
        GameConfig.DOLL_4 = null;
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(sprite: Phaser.Button): void {
        GameConfig.GAME_COMPLETED = true;
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

