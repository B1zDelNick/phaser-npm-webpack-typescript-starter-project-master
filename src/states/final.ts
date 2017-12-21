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
import {AdUtils} from '../utils/ad/ad.utils';

export default class Final extends Phaser.State {

    private NEXT = 'Start';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private cross1: CrossButton = null;
    private cross2: CrossButton = null;
    private moreBtn: Phaser.Button = null;
    private ban1: Phaser.Button = null;
    private ban2: Phaser.Button = null;

    private bg: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private phase = 0;

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
        this.phase = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg6').getName());

        GameConfig.DOLL_3.insert();
        GameConfig.DOLL_1.insert();
        GameConfig.DOLL_2.insert();
        GameConfig.DOLL_1.setAlpha(1);
        GameConfig.DOLL_2.setAlpha(1);
        GameConfig.DOLL_3.setAlpha(1);
        GameConfig.DOLL_3.setPosition(69 - 700, 54);
        GameConfig.DOLL_1.setPosition(324 + 700, 45);
        GameConfig.DOLL_2.setPosition(543 + 700, 41);

        this.cross1 = new CrossButton(this, 'http://freegamescasual.com/Free-Online-Games/Princesses/Teen-Princesses-Nightlife.html');
        this.cross2 = new CrossButton(this, 'http://freegamescasual.com/Free-Online-Games/Princesses/Autumn-Must-Haves-for-Princesses.html');

        if (GameConfig.PUB_MODE === PublishMode.DUW || GameConfig.PUB_MODE === PublishMode.GGG) {
            this.ban1 = this.cross1
                .buttonAndReturn(0, 215, 1,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban1,
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
            this.ban2 = this.cross2
                .buttonAndReturn(750, 215, 1,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Ban2,
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        }
        else {
            this.ban1 = this.cross1
                .buttonAndReturn(35, 145, 1,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross1,
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
            this.ban2 = this.cross2
                .buttonAndReturn(485, 145, 1,
                    ImageUtils.getAtlasClass('AtlasesStateFinal').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateFinal').Frames.Cross2,
                    GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        }
        this.ban1.alpha = 0;
        this.ban1.scale.setTo(0);
        this.ban2.alpha = 0;
        this.ban2.scale.setTo(0);

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
        const skipBtn = this.gui.addExtraBtn(-5, 593,
            ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
            ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.DoneFgc,
            () => {
                TweenUtils.slideOut(GameConfig.DOLL_2.getBody(), 543 + 700, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 0);
                TweenUtils.slideOut(GameConfig.DOLL_3.getBody(), 69 - 700, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
                TweenUtils.slideOut(GameConfig.DOLL_1.getBody(), 324 + 700, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                TweenUtils.fadeAndScaleOut(skipBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0, () => {
                    TweenUtils.fadeAndScaleIn(this.ban1, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
                    TweenUtils.fadeAndScaleIn(this.ban2, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
                    TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
                }, this);
            });
        skipBtn.scale.setTo(0);
        skipBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.slideIn(GameConfig.DOLL_1.getBody(), 324, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
        TweenUtils.slideIn(GameConfig.DOLL_3.getBody(), 69, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1.5);
        TweenUtils.slideIn(GameConfig.DOLL_2.getBody(), 543, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
        if (GameConfig.PUB_MODE === PublishMode.DUW || GameConfig.PUB_MODE === PublishMode.GGG) {
            TweenUtils.fadeAndScaleIn(this.ban1, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2.5);
            TweenUtils.fadeAndScaleIn(this.ban2, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2.5);
            TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3);
        }
        else {
            TweenUtils.fadeAndScaleIn(skipBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3);
            // Ad Calls
            if (GameConfig.PUB_MODE === PublishMode.NORMAL ||
                GameConfig.PUB_MODE === PublishMode.NO_BUTTONS) {
                AdUtils.playAds();
            }
        }

        // Assets Managment starts here
        // Nothing to Load Here, just enjoy :)
        this.nextPrepared = true;
        if (!GameConfig.IS_ASSETS_LOADED)
            GameConfig.IS_ASSETS_LOADED = true;
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
        if (this.cross1) this.cross1.dispose();
        if (this.cross1) this.cross2.dispose();

        if (this.spinner) this.spinner.destroy(true);
        if (this.spinner) this.spinner.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1.dispose();
        GameConfig.DOLL_1 = null;
        GameConfig.DOLL_2.dispose();
        GameConfig.DOLL_2 = null;
        GameConfig.DOLL_3.dispose();
        GameConfig.DOLL_3 = null;
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

