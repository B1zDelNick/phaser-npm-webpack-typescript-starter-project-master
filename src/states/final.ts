import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
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

export default class Final extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
    private cloud3: Phaser.Sprite = null;
    private particle: IParticle = null;
    private cross1: Phaser.Sprite = null;
    private cross2: Phaser.Sprite = null;
    private btnContainer: Phaser.Group = null;

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

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg').getName());

        this.particle = new FallParticles(.5, 1);
        this.particle.init(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Dot1,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.Dot2,
            ]);
        this.particle.start();

        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_3.insert();
        GameConfig.DOLL_1.setPosition(206 + 800, 67);
        GameConfig.DOLL_2.setPosition(769 + 800, 58);
        GameConfig.DOLL_2.setScale(-1, 1);
        GameConfig.DOLL_3.setPosition(382 + 800, 57);

        this.cloud1 = this.game.add.sprite(712, 189,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Hash1);
        this.cloud2 = this.game.add.sprite(698, 314,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Hash2);
        this.cloud3 = this.game.add.sprite(631, 433,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Hash3);
        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;
        this.cloud3.alpha = 0;

        this.btnContainer = this.game.add.group();
        if (GameConfig.PUB_MODE === PublishMode.DUW || GameConfig.PUB_MODE === PublishMode.GGG) {
            /*this.cross1 =
                GuiUtils.makeButton(
                    this, this.btnContainer,
                    10, 90, 1,
                    '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban1,
                    true, true, true,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boyfriends-Wardrobe-Inspired-Look.html'),
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
            this.cross2 =
                GuiUtils.makeButton(
                    this, this.btnContainer,
                    10, 330, 1,
                    '', ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban2,
                    true, true, true,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boyfriends-Wardrobe-Inspired-Look.html'),
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
            this.cross1.scale.setTo(0);
            this.cross1.alpha = 0;
            this.cross2.scale.setTo(0);
            this.cross2.alpha = 0;*/
        }
        else {
            this.cross1 =
                GuiUtils.makeSpritesheetButton(
                    this, this.btnContainer,
                    8, 118 - 800, 1, 10, false, '',
                    ImageUtils.getSpritesheetClass('SpritesheetsCross123031021').getName(), null, // [0, 1, 2, 3], // , 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                    true, true, true,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Boho-Wedding-Rivals.html'),
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
            this.cross2 =
                GuiUtils.makeSpritesheetButton(
                    this, this.btnContainer,
                    188, 330 - 800, 1, 10, false, '',
                    ImageUtils.getSpritesheetClass('SpritesheetsCross221529921').getName(), null,
                    true, true, true,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Boho-Winter-with-Princesses.html'),
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        }
        this.cross1.animations.stop('butAnim', true);
        this.cross2.animations.stop('butAnim', true);

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
        TweenUtils.slideIn(GameConfig.DOLL_1.getBody(), 206, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.slideIn(GameConfig.DOLL_2.getBody(), 769, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
        TweenUtils.slideIn(GameConfig.DOLL_3.getBody(), 382, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1.5);
        TweenUtils.fadeIn(this.cloud1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3);
        TweenUtils.fadeIn(this.cloud2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3.5);
        TweenUtils.fadeIn(this.cloud3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 4);
        TweenUtils.moveIn(this.cross1, 123, 273, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 4.5, () => {
            this.cross1.animations.add('butAnim');
            this.cross1.animations.play('butAnim', 10, false);
        }, this);
        TweenUtils.moveIn(this.cross2, 295, 479, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 5, () => {
            this.cross2.animations.add('butAnim');
            this.cross2.animations.play('butAnim', 10, false);
        }, this);
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 6);

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

        if (this.particle) this.particle.dispose();
        if (this.bg) this.bg.destroy(true);
        if (this.cloud1) this.cloud1.destroy(true);
        if (this.cloud2) this.cloud2.destroy(true);
        if (this.cloud3) this.cloud3.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);
        if (this.cross1) this.cross1.destroy(true);
        if (this.cross2) this.cross2.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_2.dispose();
        GameConfig.DOLL_3.dispose();
        GameConfig.DOLL_1 = null;
        GameConfig.DOLL_2 = null;
        GameConfig.DOLL_3 = null;
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

