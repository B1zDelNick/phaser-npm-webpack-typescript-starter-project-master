import * as Assets from '../assets';
import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {ILaser} from './spec-effects/laser/i.laser';
import {EffectUtils} from '../utils/effect.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {Animation} from '../utils/animation/anim';
import {TweenUtils} from '../utils/tween.utils';
import {Doll} from './template/dress/doll';
import {CrossBlock} from './template/final/cross.block';

export default class Final extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private laser: ILaser = null;
    private anna: Doll = null;
    private elza: Doll = null;
    private girl: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private cross: CrossBlock = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private another: Phaser.Button = null;

    private restart: boolean = true;

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

        this.anna = null;
        this.elza = null;
        this.cross = null;

        this.anna = args[0] as Doll;
        this.elza = args[1] as Doll;

        this.NEXT = 'Start';
        this.restart = true;
    }

    public preload(): void {
    }

    public create(): void {
        this.game.add.sprite(0, 0,
            Assets.Atlases.AtlasesStartState.getName(),
            Assets.Atlases.AtlasesStartState.Frames.Bg);

        this.laser = EffectUtils.makeLaser(LaserType.DOUBLE_LASER);
        this.laser.init(Assets.Atlases.AtlasesEffects.getName(), Assets.Atlases.AtlasesEffects.Frames.Light.toString());
        this.laser.start();

        this.girl = this.game.add.sprite(13, -15,
            Assets.Atlases.AtlasesFinalState.getName(),
            Assets.Atlases.AtlasesFinalState.Frames.Gr7);

        this.anna.insert();
        this.elza.insert();
        this.elza.setPosition(144, 17);
        this.anna.setPosition(303, 20);
        this.elza.show(true);
        this.anna.show(true);

        this.cloud = this.game.add.sprite(-38, 159,
            Assets.Atlases.AtlasesFinalState.getName(),
            Assets.Atlases.AtlasesFinalState.Frames.Cl6);
        this.cloud.alpha = 0;

        this.cross = new CrossBlock(this, 700)
            .background(492, 124,
                Assets.Atlases.AtlasesFinalState.getName(),
                Assets.Atlases.AtlasesFinalState.Frames.Panel)
            .animatedTitle(632, 151, Assets.Spritesheets.SpritesheetsSign238469.getName(), 11)
            .page()
                .banner(656, 215, 'cross1',
                    Assets.Atlases.AtlasesFinalState.getName(),
                    Assets.Atlases.AtlasesFinalState.Frames.Ban1,
                    GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Princesses-Paris-Shopping-Spree.html'))
                .build()
            .page()
                .banner(656, 215, 'cross2',
                    Assets.Atlases.AtlasesFinalState.getName(),
                    Assets.Atlases.AtlasesFinalState.Frames.Ban2,
                    GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Disney-Couple-Ice-Princess-Magic-Date.html'))
                .build()
            .leftArrow(627, 402, .75,
                Assets.Atlases.AtlasesGuiFgc.getName(),
                Assets.Atlases.AtlasesGuiFgc.Frames.LArrFgc)
            .rightArrow(846, 402, .75,
                Assets.Atlases.AtlasesGuiFgc.getName(),
                Assets.Atlases.AtlasesGuiFgc.Frames.RArrFgc)
            .build();

        // GUI Buttons
        this.gui.addGui(false);
        const playBtn = this.gui.addPlayBtn(this.nextState, 670);
        const moreBtn = this.gui.addExtraMore(
            960 - 189, 720 - 182,
            Assets.Atlases.AtlasesStartState.getName(),
            Assets.Atlases.AtlasesStartState.Frames.EMore,
            GuiUtils.addOverScaleHandler,
            GuiUtils.addOutScaleHandler
        );
        moreBtn.filters = [EffectUtils.makeGlowAnimation(0xff33ff)];
        this.another = this.gui.addExtraBtn(2, 541,
            Assets.Atlases.AtlasesFinalState.getName(),
            Assets.Atlases.AtlasesFinalState.Frames.Another,
            this.nextState
        );
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;
        this.another.scale.setTo(0);
        this.another.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(this.another, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
        TweenUtils.slideIn(this.cross.getContainer(), 0, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2.75);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 4.25);

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

        this.laser.dispose();
        this.girl.destroy(true);
        this.cloud.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        this.cross.dispose();

        if (!this.restart) {
            this.anna.extract();
            this.elza.extract();
        }
        else {
            this.anna.dispose();
            this.elza.dispose();
            this.anna = null;
            this.elza = null;
        }
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(sprite: Phaser.Button): void {
        this.restart = sprite !== this.another;
        if (!this.restart) {
            this.NEXT = 'Dress1';
        }
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
            if (this.restart) this.game.state.start(this.NEXT, true, false, null, null);
            else this.game.state.start(this.NEXT, true, false, this.anna, this.elza);
        } else {
            if (addLoader) {
                this.spinner = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Images.ImagesSpin.getName());
                this.spinner.anchor.setTo(.5, .5);
                // this.spinner.scale.setTo(.5);
                TweenUtils.rotate(this.spinner, 360, Phaser.Timer.SECOND * 1, 0, -1);
            }
            this.game.time.events.add(Phaser.Timer.SECOND *  .25, this.reallyGoNextState, this);
        }
    }
}

