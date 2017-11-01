import * as Assets from '../assets';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {EffectUtils} from '../utils/effect.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {CrossButton} from './template/final/cross.button';

export default class Final extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private cross1: CrossButton = null;
    private cross2: CrossButton = null;
    private cross3: CrossButton = null;

    private bg: Phaser.Sprite = null;
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

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg5').getName());

        this.cross1 = new CrossButton(this, 'http://dressupmix.com/Free-Dressup-Games/Princess/Princesses-Double-Boho-Wedding-play.html');
        this.cross2 = new CrossButton(this, 'http://dressupmix.com/Free-Dressup-Games/Princess/Princesses-BFFs-Fall-Party-play.html');
        this.cross3 = new CrossButton(this, 'http://dressupmix.com/Free-Dressup-Games/Princess/Princesses-Movie-Rehearsal-play.html');

        const doll1 = this.cross1
            .buttonAndReturn(55, 275, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross1, null, null);
        const doll2 = this.cross2
            .buttonAndReturn(347, 275, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross2, null, null);
        const doll3 = this.cross3
            .buttonAndReturn(636, 275, 1,
                ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross3, null, null);

        const btn1 = this.cross1
            .buttonAndReturn(138, 405, 1.1,
                ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.PlayDu,
                GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);
        const btn2 = this.cross2
            .buttonAndReturn(431, 405, 1.1,
                ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.PlayDu,
                GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);
        const btn3 = this.cross3
            .buttonAndReturn(724, 405, 1.1,
                ImageUtils.getAtlasClass('AtlasesGuiDu').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiDu').Frames.PlayDu,
                GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);

        // GUI Buttons
        this.gui.addGui(false);
        this.gui.addPlayBtn(this.nextState);
        const moreBtn = this.gui.addExtraMore(
            960 - 124, 720 - 200,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
            GuiUtils.addOverGlowHandler,
            GuiUtils.addOutGlowHandler
        );
        EffectUtils.makeLightRotateAnimation(moreBtn, Phaser.Timer.SECOND * .8);

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        doll1.filters = [EffectUtils.makeGlowAnimation()];
        doll2.filters = [EffectUtils.makeGlowAnimation()];
        doll3.filters = [EffectUtils.makeGlowAnimation()];
        EffectUtils.makeScaleAnimation(btn1, 1.15, Phaser.Timer.SECOND * .6);
        EffectUtils.makeScaleAnimation(btn2, 1.15, Phaser.Timer.SECOND * .6);
        EffectUtils.makeScaleAnimation(btn3, 1.15, Phaser.Timer.SECOND * .6);

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

        this.bg.destroy(true);
        this.cross1.dispose();
        this.cross2.dispose();
        this.cross3.dispose();

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_2.dispose();

        GameConfig.DOLL_1 = null;
        GameConfig.DOLL_2 = null;
        GameConfig.CONT_1 = null;
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
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

