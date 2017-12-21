import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {EffectUtils} from '../utils/effect.utils';
import {Animation} from '../utils/animation/anim';
import {TweenUtils} from '../utils/tween.utils';
import {Chest} from './template/dress/chest';
import {Doll} from './template/dress/doll';
import {isNull, isUndefined} from 'util';
import {AdUtils} from '../utils/ad/ad.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {SoundUtils} from '../utils/sound/sound.utils';
import {IParticle} from './spec-effects/particle/i.particle';
import {BlowParticles} from './spec-effects/particle/blow.particle';
import {HandyUtils} from '../utils/utility/handy.utils';

export default class Dress1 extends Phaser.State {

    private NEXT = 'Dress2';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;
    private doll: Doll = null;
    private chest: Chest = null;
    private particle: IParticle = null;
    private spinner: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
    private colB: Phaser.Sprite = null;
    private colF: Phaser.Sprite = null;
    private colT: Phaser.Sprite = null;
    private col: Phaser.Sprite = null;
    private gl1: Phaser.Sprite = null;
    private gl2: Phaser.Sprite = null;
    private colContainer: Phaser.Group = null;
    private btnContainer: Phaser.Group = null;
    private mmmm: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private playBtn: Phaser.Button = null;
    private moreBtn: Phaser.Button = null;
    private skipBtn: Phaser.Button = null;

    private tasks: any[][] = null;
    private curTask: any[] = null;
    private curTaskNum: number;
    private col1_total = 0;
    private col2_total = 0;
    private topOn: string = null;
    private jackOn: string = null;
    private botOn: string = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.DRESS_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.DRESS_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.DRESS_STATE);
                break;
            }
        }
        this.tasks = [
            ['red', 'pink', 1],
            ['yellow', 'blue', 2],
            ['olive', 'pink', 3],
            ['red', 'orange', 4],
            ['green', 'pink', 5]
        ];
        HandyUtils.shuffleArray(this.tasks);
        this.curTaskNum = 0; // this.game.rnd.between(0, this.tasks.length - 1);
        this.curTask = this.tasks[this.curTaskNum];
        this.tasks.splice(this.curTaskNum, 1);
        this.col1_total = 0;
        this.col2_total = 0;
        this.topOn = null;
        this.botOn = null;
        this.jackOn = null;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName());

        this.colContainer = this.game.add.group();
        this.colB = this.game.add.sprite(667, 132,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ColBack,
            this.colContainer);
        this.col = this.game.add.sprite(750, 209,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames['Col' + (this.curTask[2])],
            this.colContainer);
        this.colF = this.game.add.sprite(747, 285,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ColFront,
            this.colContainer);
        this.colT = this.game.add.sprite(743, 97,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ColTxt,
            this.colContainer);
        this.gl1 = this.game.add.sprite(753, 295,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Galka,
            this.colContainer);
        this.gl2 = this.game.add.sprite(862, 295,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Galka,
            this.colContainer);
        GuiUtils.centrize(this.gl1);
        GuiUtils.centrize(this.gl2);
        GuiUtils.centrize(this.colT);
        EffectUtils.makeScaleAnimation(this.colT);
        this.gl1.alpha = 0;
        this.gl2.alpha = 0;
        this.gl1.scale.setTo(0);
        this.gl2.scale.setTo(0);

        // Chests
        this.chest = new Chest(this, -700)
            .configure({hideSelected: true})
            .background(12, 16,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .pageShelf(24, 89,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(254, 77, 'jack3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack3Green,
                    this.onItem)
                .item(234, 77, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot3Blue,
                    this.onItem)
                .item(152, 79, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot5Pink,
                    this.onItem)
                .item(79, 79, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot6Green,
                    this.onItem)
                .item(14, 79, 'bot7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot7Orange,
                    this.onItem)
            .build()
            .page()
                .pageShelf(24, 89,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(230, 82, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jack2Pink,
                    this.onItem)
                .item(157, 77, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot4Green,
                    this.onItem)
                .item(28, 80, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot1Olive,
                    this.onItem)
                .item(13, 82, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot2Blue,
                    this.onItem)
                .pageShelf(24, 417,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(265, 409, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top6Red,
                    this.onItem)
                .item(243, 409, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top1Yellow,
                    this.onItem)
                .item(167, 410, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top5Orange,
                    this.onItem)
                .item(84, 405, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top2Pink,
                    this.onItem)
                .item(-6, 411, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top3Blue,
                    this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
                .item(15, 121, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Cross,
                    GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Autumn-Must-Haves-for-Princesses.html'),
                    null, null)
                .item(160, 495, 'mmmm_btn',
                    ImageUtils.getAtlasClass('AtlasesGuiFgc').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiFgc').Frames.PlayFgc,
                    GuiUtils.goCross('http://freegamescasual.com/Free-Online-Games/Princesses/Autumn-Must-Haves-for-Princesses.html'),
                    GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
            .build()
            .leftArrow(457, 416,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(457, 326,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            this.chest.findItem('mmmm').filters = [EffectUtils.makeGlowAnimation(0xffff99)];
            EffectUtils.makeScaleAnimation(this.chest.findItem('mmmm_btn'), 1.05, 500);
        }

        // Dolls
        this.doll = new Doll(this, 491, 45)
            .layer(0, 0, 'hair_b',
                'AtlasesDollJas',
                'HB', 'HB')
            .layer(0, 0, 'jack_b',
                'AtlasesDollJas',
                'JkB', null, true)
            .layer(0, 0, 'body',
                'AtlasesDollJas',
                'Body', 'Body')
            .layer(0, 0, 'shoe',
                'AtlasesDollJas',
                'S', 'S')
            .layer(0, 0, 'und',
                'AtlasesDollJas',
                'Und', 'Und')
            .layer(0, 0, 'bot',
                'AtlasesDollJas',
                'B', null)
            .layer(0, 0, 'top',
                'AtlasesDollJas',
                'T', null)
            .layer(0, 0, 'jack',
                'AtlasesDollJas',
                'Jk', null, true)
            .layer(0, 0, 'head',
                'AtlasesDollJas',
                'Head', 'Head')
            .layer(0, 0, 'hair',
                'AtlasesDollJas',
                'H', 'H');

        this.particle = new BlowParticles(.5, .9, 645, 20);
        this.particle.init(
            ImageUtils.getAtlasClass('AtlasesEffects').getName(),
            [
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.GStar1,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.GStar2,
                ImageUtils.getAtlasClass('AtlasesEffects').Frames.GStar3,
            ]);

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
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        this.skipBtn = this.gui.addExtraBtn(0, 580,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Skip,
            this.nextState);
        this.skipBtn.scale.setTo(0);
        this.skipBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Initalizations

        // Animations goes here
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.chest.show, this.chest);
        TweenUtils.fadeAndScaleIn(this.skipBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress2State();
            PreloaderUtils.preloadDress3State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        if (GameConfig.PUB_MODE === PublishMode.NORMAL || GameConfig.PUB_MODE === PublishMode.NO_BUTTONS) {
            AdUtils.playAds();
        }
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

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.doll.on('dress', index, 'top', 'bot', 'und')) {
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            }
            this.doll.on('dress_b', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.doll.on('top', index, 'dress')) {
                this.chest.onEquiped(name, 'top', 'dress');
                this.topOn = item.name;
            }
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.doll.on('bot', index, 'dress')) {
                this.chest.onEquiped(name, 'bot', 'dress');
                this.botOn = item.name;
            }
        }
        else if (name.indexOf('jack') !== -1) {
            index = parseInt(name.substr(4));
            this.doll.on('jack', index);
            this.doll.on('jack_b', index);
            if (this.doll.isLayerEmpty('jack')) {
                this.jackOn = null;
            }
            else {
                this.jackOn = item.name;
            }
        }
        this.col1_total = 0;
        this.col2_total = 0;
        const res1 = this.defineColorByName(this.topOn);
        if (res1 === this.curTask[0]) {
            this.col1_total++;
        }
        else if (res1 === this.curTask[1]) {
            this.col2_total++;
        }
        const res2 = this.defineColorByName(this.botOn);
        if (res2 === this.curTask[0]) {
            this.col1_total++;
        }
        else if (res2 === this.curTask[1]) {
            this.col2_total++;
        }
        const res3 = this.defineColorByName(this.jackOn);
        if (res3 === this.curTask[0]) {
            this.col1_total++;
        }
        else if (res3 === this.curTask[1]) {
            this.col2_total++;
        }
        if (this.col1_total > 0 && this.gl1.alpha === 0) {
            TweenUtils.fadeAndScaleIn(this.gl1);
        }
        else if (this.col1_total === 0 && this.gl1.alpha === 1) {
            TweenUtils.fadeAndScaleOut(this.gl1);
        }
        if (this.col2_total > 0 && this.gl2.alpha === 0) {
            TweenUtils.fadeAndScaleIn(this.gl2);
        }
        else if (this.col2_total === 0 && this.gl2.alpha === 1) {
            TweenUtils.fadeAndScaleOut(this.gl2);
        }
        if (this.col1_total > 0 && this.col2_total > 0
            && !this.doll.isLayerEmpty('top')
            && !this.doll.isLayerEmpty('bot')) {
            this.chest.disable();
            this.particle.start();
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 3, () => {
                TweenUtils.fadeAndScaleOut(this.gl1);
                TweenUtils.fadeAndScaleOut(this.gl2);
                if (this.tasks.length !== 0) {
                    this.doll.on('', null, 'top', 'bot', 'jack', 'jack_b');
                    this.chest.onEquiped('', 'bot');
                    this.chest.onEquiped('', 'top');
                    this.topOn = null;
                    this.botOn = null;
                    this.jackOn = null;
                    this.chest.enable();
                    this.curTaskNum = this.game.rnd.between(0, this.tasks.length - 1);
                    this.curTask = this.tasks[this.curTaskNum];
                    this.tasks.splice(this.curTaskNum, 1);
                    this.col1_total = 0;
                    this.col2_total = 0;
                    this.col.loadTexture(
                        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames['Col' + (this.curTask[2])]);
                }
                else {
                    TweenUtils.fadeAndScaleOut(this.skipBtn);
                    TweenUtils.fadeOut(this.colContainer);
                    this.chest.enable();
                    TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.nextState, this);
                }
            }, this);
        }
        /*if (this.playBtn.alpha === 0) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }*/
    }

    private defineColorByName(name: string): string {
        let res: string = null;
        switch (name) {
            case 'bot1': {
                res = 'olive';
                break;
            }
            case 'bot2': {
                res = 'blue';
                break;
            }
            case 'bot3': {
                res = 'blue';
                break;
            }
            case 'bot4': {
                res = 'green';
                break;
            }
            case 'bot5': {
                res = 'pink';
                break;
            }
            case 'bot6': {
                res = 'green';
                break;
            }
            case 'bot7': {
                res = 'orange';
                break;
            }
            case 'top1': {
                res = 'yellow';
                break;
            }
            case 'top2': {
                res = 'pink';
                break;
            }
            case 'top3': {
                res = 'blue';
                break;
            }
            case 'top5': {
                res = 'orange';
                break;
            }
            case 'top6': {
                res = 'red';
                break;
            }
            case 'jack2': {
                res = 'pink';
                break;
            }
            case 'jack3': {
                res = 'green';
                break;
            }
        }
        return res;
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.chest.dispose();

        if (this.bg) this.bg.destroy(true);
        if (this.btnContainer) this.btnContainer.destroy(true);
        if (this.mmmm) this.mmmm.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1 = this.doll.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.CURRENT_STATE++;
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.moveInOut(this.doll.getBody(), this.doll.getBody().x - 150, this.doll.getBody().y, 2000);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2.5, () => {
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
        }, this);
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

