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
import {CrossPhone} from './template/final/cross.phone';
import {CrossButton} from './template/final/cross.button';

export default class Final extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private _mask: Phaser.Graphics = null;
    private crossPhone: CrossPhone = null;
    private cross1: CrossButton = null;
    private cross2: CrossButton = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private g1: Phaser.Sprite = null;
    private g2: Phaser.Sprite = null;
    private g3: Phaser.Sprite = null;
    private moreB: Phaser.Button = null;
    private moreState: number = 0;

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
        this.moreState = -1;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg5').getName());

        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_1.setAlpha(1);
        GameConfig.DOLL_2.setAlpha(1);
        GameConfig.DOLL_1.setPosition(398 + 700, 2);
        GameConfig.DOLL_2.setPosition(639 + 700, 3);

        if (GameConfig.PUB_MODE === PublishMode.DUW || GameConfig.PUB_MODE === PublishMode.GGG) {
            this.cross1 = new CrossButton(this, 'http://dressupmix.com/Free-Dressup-Games/Princess/Princesses-Fashion-FlashMob.html');
            this.cross2 = new CrossButton(this, 'http://dressupmix.com/Free-Dressup-Games/Princess/Princess-Odd-Jobs-Choice.html');
            this.cross1
                .button(0, 130, 1,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban1,
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
            this.cross2
                .button(140, 420, 1,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban2,
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        }
        else {
            this.crossPhone = new CrossPhone(this)
                .background(0, 15,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Phone)
                .mask(157, 145, 273, 301, 15)
                .page()
                .sprite(36, 212,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Pic1)
                .existing(GameConfig.DECOR_1.getBody(), 50, 185, .45, 1, 15)
                .build()
                .page()
                .button(36, 212, 1, 0,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Pic2,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princesses-Statement-Hills-Obsession.html'), GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
                .banner(135, 371,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.CheckBtn,
                    GuiUtils.goCross('http://dressupmix.com/Free-Dressup-Games/Princess/Princesses-Statement-Hills-Obsession.html'))
                .build()
                .rightArrow(301, 341, 1, 0,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Arrow)
                .build();
            this.crossPhone.getContainer().x = - 700;
        }

        /*this.phone = this.game.add.sprite(189, -70,
            ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
            ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Phone1);*/

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

        // Animations goes here
        TweenUtils.slideIn(GameConfig.DOLL_1.getBody(), 398, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.slideIn(GameConfig.DOLL_2.getBody(), 639, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        if (GameConfig.PUB_MODE === PublishMode.DUW || GameConfig.PUB_MODE === PublishMode.GGG) {
        }
        else {
            TweenUtils.slideIn(this.crossPhone.getContainer(), 0, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
        }
        TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3);

        // Assets Managment starts here
        // Nothing to Load Here, just enjoy :)
        this.nextPrepared = true;
        if (!GameConfig.IS_ASSETS_LOADED)
            GameConfig.IS_ASSETS_LOADED = true;
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
        if (this.crossPhone) this.crossPhone.dispose();

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DECOR_1.dispose();
        GameConfig.DECOR_1 = null;
        GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_1 = null;
        GameConfig.DOLL_2.dispose();
        GameConfig.DOLL_2 = null;
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

