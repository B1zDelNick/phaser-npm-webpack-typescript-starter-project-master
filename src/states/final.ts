import * as Assets from '../assets';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
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
    private container1: Phaser.Group = null;
    private container2: Phaser.Group = null;
    private container3: Phaser.Group = null;
    private container4: Phaser.Group = null;

    private cross1: CrossButton = null;
    private cross2: CrossButton = null;

    private lb: Phaser.Button = null;
    private rb: Phaser.Button = null;
    private bg: Phaser.Sprite = null;
    private txt: Phaser.Text = null;
    private fg: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private current: number = 1;

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
        this.current = 1;
    }

    public preload(): void {
    }

    public create(): void {

        ///

        this.container1 = this.game.add.existing(GameConfig.CONT_1);
        this.container2 = this.game.add.existing(GameConfig.CONT_2);
        this.container3 = this.game.add.existing(GameConfig.CONT_3);

        this.container4 = this.game.add.group();
        this.bg = this.game.add.sprite(37, 14, ImageUtils.getImageClass('ImagesBg8').getName());
        this.container4.add(this.bg);
        this.bg.scale.setTo(.751);

        this.cross1 = new CrossButton(this, 'http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Winter-Shopping-Online.html');
        this.cross2 = new CrossButton(this, 'http://dressupmix.com/Free-Dressup-Games/Princess/Princess-At-Modeling-Reality---New-Stage.html');

        if (GameConfig.PUB_MODE === PublishMode.DUW || GameConfig.PUB_MODE === PublishMode.GGG) {
            const c1 = this.cross1
                .buttonAndReturn(109, 86, 1,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban1,
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
            const c2 = this.cross2
                .buttonAndReturn(260, 362, 1,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban2,
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
            this.container4.add(c1);
            this.container4.add(c2);
        }
        else {
            const c1 = this.cross1
                .buttonAndReturn(172, 120, .723,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross,
                    GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler);
            this.container4.add(c1);
        }

        this.game.add.sprite(493, 86,
            ImageUtils.getAtlasClass('AtlasesCommons').getName(),
            ImageUtils.getAtlasClass('AtlasesCommons').Frames.Gramm,
            this.container4
        );
        const p1 = this.game.add.sprite(503, 146,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Post1,
            this.container4
        );
        const p2 = this.game.add.sprite(503, 216,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Post2,
            this.container4
        );
        const p3 = this.game.add.sprite(503, 286,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Post3,
            this.container4
        );
        this.game.add.sprite(512, 587,
            ImageUtils.getAtlasClass('AtlasesCommons').getName(),
            ImageUtils.getAtlasClass('AtlasesCommons').Frames.Heart,
            this.container4
        );
        const style = { font: '35px Arial Black', fill: '#FF205D', align: 'left' };
        this.txt = this.game.add.text(548, 578, this.game.rnd.between(1000001, 1200500).toString(), style, this.container4);

        ////

        this.container2.visible = false;
        this.container3.visible = false;
        this.container4.visible = false;

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
        this.lb = this.gui.addExtraBtn(42, 299,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Lb,
            this.shiftPage, GuiUtils.addOverHandler, GuiUtils.addOutHandler
        );
        this.rb = this.gui.addExtraBtn(838, 299,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Rb,
            this.shiftPage, GuiUtils.addOverHandler, GuiUtils.addOutHandler
        );
        this.lb.scale.setTo(0);
        this.lb.alpha = 0;
        this.rb.scale.setTo(0);
        this.rb.alpha = 0;
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
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeAndScaleIn(this.lb, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(this.rb, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);

        // Assets Managment starts here
        // Nothing to Load Here, just enjoy :)
        this.nextPrepared = true;
        if (!GameConfig.IS_ASSETS_LOADED)
            GameConfig.IS_ASSETS_LOADED = true;
    }

    public shiftPage(sprite: Phaser.Button): void {
        if (sprite === this.lb) {
            this.current--;
            if (this.current < 1) this.current = 4;
        }
        else {
            this.current++;
            if (this.current > 4) this.current = 1;
        }
        this.container1.visible = false;
        this.container2.visible = false;
        this.container3.visible = false;
        this.container4.visible = false;
        if (this.current === 1) {
            this.container1.visible = true;
        }
        else if (this.current === 2) {
            this.container2.visible = true;
        }
        else if (this.current === 3) {
            this.container3.visible = true;
        }
        else if (this.current === 4) {
            this.container4.visible = true;
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        if (this.cross1) this.cross1.dispose();
        if (this.cross1) this.cross2.dispose();

        if (this.spinner) this.spinner.destroy(true);
        if (this.spinner) this.spinner.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.GAME_COMPLETED = true;
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

