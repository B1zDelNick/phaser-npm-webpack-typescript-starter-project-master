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
import {AdUtils} from '../utils/ad/ad.utils';
import {isNull} from 'util';
import {ImageUtils} from '../utils/images/image.utils';

export default class Dress extends Phaser.State {

    private NEXT = 'Result';
    private nextPrepared = false;
    private changing = false;

    private currentDoll: Doll = null;
    private currentChest: Chest = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private ariel: Doll = null;
    private belle: Doll = null;
    private cindy: Doll = null;
    private chestAriel: Chest = null;
    private chestBelle: Chest = null;
    private chestCindy: Chest = null;
    private bg: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private playBtn: Phaser.Button = null;

    private arielDressed: boolean = false;
    private belleDressed: boolean = false;
    private cindyDressed: boolean = false;
    private adShowed: boolean = false;

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
        this.ariel = null;
        this.belle = null;
        this.cindy = null;
        this.changing = false;
        this.arielDressed = false;
        this.belleDressed = false;
        this.cindyDressed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        const arr: number[] = [];
        for (let i = 0; i < 87; i++) {
        	arr.push(i);
        }

        // Chests
        this.chestCindy = new Chest(this, -700)
            .configure({hideSelected: true})
            .background(-4, 23,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .pageShelf(182, 84,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(168, 74, 'dress1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress1,
                    this.onItem)
	            .item(255, 73, 'dress2',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress2,
			        this.onItem)
	            .item(293, 72, 'dress3',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress3,
			        this.onItem)
            .build()
            .page()
	            .pageShelf(182, 84,
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .item(170, 67, 'dress4',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress4,
			        this.onItem)
	            .item(268, 74, 'dress5',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress5,
			        this.onItem)
	            .item(392, 74, 'dress6',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Dress6,
			        this.onItem)
            .build()
            .page()
	            .pageShelf(182, 84,
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .pageShelf(182, 307,
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .item(190, 72, 'top1',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top1,
			        this.onItem)
	            .item(257, 68, 'top2',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top2,
			        this.onItem)
	            .item(399, 72, 'top3',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top3,
			        this.onItem)
	            .item(175, 298, 'top4',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top4,
			        this.onItem)
	            .item(270, 294, 'top5',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top5,
			        this.onItem)
	            .item(424, 298, 'top6',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top6,
			        this.onItem)
            .build()
            .page()
	            .pageShelf(182, 84,
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .pageShelf(182, 307,
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .item(192, 294, 'bot4',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot4,
			        this.onItem)
	            .item(310, 294, 'bot5',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot5,
			        this.onItem)
	            .item(421, 294, 'bot6',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot6,
			        this.onItem)
	            .item(195, 71, 'bot1',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot1,
			        this.onItem)
	            .item(288, 67, 'bot2',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot2,
			        this.onItem)
	            .item(423, 71, 'bot3',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot3,
			        this.onItem)
            .build()
            .page()
	            .pageShelf(178, 212,
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .pageShelf(178, 352,
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .pageShelf(178, 500,
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .item(192, 132, 'hat1',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat1,
			        this.onItem)
	            .item(273, 113, 'hat2',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat2,
			        this.onItem)
	            .item(364, 151, 'glass1',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glass1,
			        this.onItem)
	            .item(172, 293, 'glass2',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glass2,
			        this.onItem)
	            .item(318, 269, 'bag1',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag1,
			        this.onItem)
	            .item(415, 275, 'bag2',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag2,
			        this.onItem)
	            .item(189, 384, 'bag3',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag3,
			        this.onItem)
	            .item(267, 428, 'bag4',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag4,
			        this.onItem)
	            .item(407, 432, 'bag5',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag5,
			        this.onItem)
	            .item(222, 526, 'bag6',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag6,
			        this.onItem)
	            .item(347, 523, 'bag7',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag7,
			        this.onItem)
	            .item(404, 537, 'bag8',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag8,
			        this.onItem)
            .build()
            .page()
	            .pageShelf(178, 310,
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .pageShelf(178, 545,
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .item(219, 111, 'jew1',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew1,
			        this.onItem)
	            .item(316, 108, 'jew2',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew2,
			        this.onItem)
	            .item(408, 111, 'jew3',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew3,
			        this.onItem)
	            .item(207, 340, 'jew4',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew4,
			        this.onItem)
	            .item(316, 340, 'jew5',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew5,
			        this.onItem)
	            .item(417, 340, 'jew6',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Jew6,
			        this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
	            .pageShelf(178, 472,
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .item(191, 103, 'mmmm',
			        ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			        ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
			        GuiUtils.goCross('https://mycutegames.com/Games/Princess/Princess-Winter-Photoshoot.html'),
			        GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
	            .animatedItem(205, 124, 'mmmm_label',
			        ImageUtils.getSpritesheetClass('SpritesheetsMmmmT2914287').getName(),
		            arr, 10, true,
		            GuiUtils.goCross('https://mycutegames.com/Games/Princess/Princess-Winter-Photoshoot.html'), null, null)
            .build()
            .static()
                .compoundItem(6, 1, -1, 0, 96, 'hair',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'Hair',
                    this.onItem)
            .build()
            .leftArrow(51, 344,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(62, 473,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .button(514, 119, 'ar_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBtn, this.changeDoll)
            .button(513, 241, 'bl_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.BlBtn, this.changeDoll)
            .build();
	    this.chestAriel = new Chest(this, -700)
            .configure({hideSelected: true})
            .background(-4, 23,
			    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
	            .pageShelf(182, 84,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .item(140, 68, 'dress1',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress1,
				    this.onItem)
	            .item(231, 68, 'dress2',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress2,
				    this.onItem)
	            .item(394, 68, 'dress3',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress3,
				    this.onItem)
            .build()
            .page()
	            .pageShelf(182, 84,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .item(169, 72, 'dress4',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress4,
				    this.onItem)
	            .item(221, 66, 'dress5',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress5,
				    this.onItem)
	            .item(401, 70, 'dress6',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Dress6,
				    this.onItem)
            .build()
            .page()
	            .pageShelf(182, 84,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .pageShelf(182, 307,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .item(125, 71, 'top1',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top1,
				    this.onItem)
	            .item(247, 68, 'top2',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top2,
				    this.onItem)
	            .item(399, 68, 'top3',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top3,
				    this.onItem)
	            .item(160, 295, 'top4',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top4,
				    this.onItem)
	            .item(278, 295, 'top5',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top5,
				    this.onItem)
	            .item(379, 290, 'top6',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top6,
				    this.onItem)
            .build()
            .page()
	            .pageShelf(182, 84,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .pageShelf(182, 307,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .item(169, 295, 'bot4',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot4,
				    this.onItem)
	            .item(262, 295, 'bot5',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot5,
				    this.onItem)
	            .item(395, 294, 'bot6',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot6,
				    this.onItem)
	            .item(186, 73, 'bot1',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot1,
				    this.onItem)
	            .item(299, 73, 'bot2',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot2,
				    this.onItem)
	            .item(407, 73, 'bot3',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot3,
				    this.onItem)
            .build()
            .page()
	            .pageShelf(178, 212,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .pageShelf(178, 352,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .pageShelf(178, 500,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .item(192, 132, 'hat1',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat1,
				    this.onItem)
	            .item(273, 113, 'hat2',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat2,
				    this.onItem)
	            .item(364, 151, 'glass1',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glass1,
				    this.onItem)
	            .item(172, 293, 'glass2',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glass2,
				    this.onItem)
	            .item(318, 269, 'bag1',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag1,
				    this.onItem)
	            .item(415, 275, 'bag2',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag2,
				    this.onItem)
	            .item(189, 384, 'bag3',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag3,
				    this.onItem)
	            .item(267, 428, 'bag4',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag4,
				    this.onItem)
	            .item(407, 432, 'bag5',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag5,
				    this.onItem)
	            .item(222, 526, 'bag6',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag6,
				    this.onItem)
	            .item(347, 523, 'bag7',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag7,
				    this.onItem)
	            .item(404, 537, 'bag8',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag8,
				    this.onItem)
            .build()
            .page()
	            .pageShelf(178, 310,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .pageShelf(178, 545,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .item(207, 108, 'jew1',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew1,
				    this.onItem)
	            .item(314, 108, 'jew2',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew2,
				    this.onItem)
	            .item(419, 108, 'jew3',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew3,
				    this.onItem)
	            .item(207, 336, 'jew4',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew4,
				    this.onItem)
	            .item(314, 336, 'jew5',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew5,
				    this.onItem)
	            .item(418, 336, 'jew6',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Jew6,
				    this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
	            .pageShelf(178, 472,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .item(191, 103, 'mmmm',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
				    GuiUtils.goCross('https://mycutegames.com/Games/Princess/Princess-Winter-Photoshoot.html'),
				    GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
	            .animatedItem(205, 124, 'mmmm_label',
				    ImageUtils.getSpritesheetClass('SpritesheetsMmmmT2914287').getName(),
				    arr, 10, true,
				    GuiUtils.goCross('https://mycutegames.com/Games/Princess/Princess-Winter-Photoshoot.html'), null, null)
            .build()
            .static()
	            .compoundItem(6, 1, -1, 0, 96, 'hair',
				    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames, 'Hair',
				    this.onItem)
            .build()
            .leftArrow(51, 344,
			    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(62, 473,
			    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .button(514, 241, 'ci_btn',
			    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBtn, this.changeDoll)
            .button(513, 119, 'bl_btn',
			    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.BlBtn, this.changeDoll)
            .build();
	    this.chestBelle = new Chest(this, -700)
            .configure({hideSelected: true})
            .background(-4, 23,
			    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
	            .pageShelf(182, 84,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .item(131, 64, 'dress1',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress1,
				    this.onItem)
	            .item(241, 69, 'dress2',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress2,
				    this.onItem)
	            .item(315, 63, 'dress3',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress3,
				    this.onItem)
            .build()
            .page()
	            .pageShelf(182, 84,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .item(139, 65, 'dress4',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress4,
				    this.onItem)
	            .item(295, 67, 'dress5',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress5,
				    this.onItem)
	            .item(342, 68, 'dress6',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Dress6,
				    this.onItem)
            .build()
            .page()
	            .pageShelf(182, 84,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .pageShelf(182, 307,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .item(162, 66, 'top1',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top1,
				    this.onItem)
	            .item(267, 67, 'top2',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top2,
				    this.onItem)
	            .item(403, 69, 'top3',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top3,
				    this.onItem)
	            .item(148, 291, 'top4',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top4,
				    this.onItem)
	            .item(263, 291, 'top5',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top5,
				    this.onItem)
	            .item(373, 291, 'top6',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top6,
				    this.onItem)
            .build()
            .page()
	            .pageShelf(182, 84,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .pageShelf(182, 307,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
	            .item(199, 295, 'bot4',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot4,
				    this.onItem)
	            .item(306, 295, 'bot5',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot5,
				    this.onItem)
	            .item(411, 295, 'bot6',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot6,
				    this.onItem)
	            .item(185, 67, 'bot1',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot1,
				    this.onItem)
	            .item(264, 67, 'bot2',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot2,
				    this.onItem)
	            .item(418, 71, 'bot3',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot3,
				    this.onItem)
            .build()
            .page()
	            .pageShelf(178, 212,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .pageShelf(178, 352,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .pageShelf(178, 500,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .item(192, 132, 'hat1',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat1,
				    this.onItem)
	            .item(273, 113, 'hat2',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat2,
				    this.onItem)
	            .item(364, 151, 'glass1',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glass1,
				    this.onItem)
	            .item(172, 293, 'glass2',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glass2,
				    this.onItem)
	            .item(318, 269, 'bag1',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag1,
				    this.onItem)
	            .item(415, 275, 'bag2',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag2,
				    this.onItem)
	            .item(189, 384, 'bag3',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag3,
				    this.onItem)
	            .item(267, 428, 'bag4',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag4,
				    this.onItem)
	            .item(407, 432, 'bag5',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag5,
				    this.onItem)
	            .item(222, 526, 'bag6',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag6,
				    this.onItem)
	            .item(347, 523, 'bag7',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag7,
				    this.onItem)
	            .item(404, 537, 'bag8',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bag8,
				    this.onItem)
            .build()
            .page()
	            .pageShelf(178, 310,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .pageShelf(178, 545,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .item(198, 100, 'jew1',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew1,
				    this.onItem)
	            .item(295, 100, 'jew2',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew2,
				    this.onItem)
	            .item(390, 100, 'jew3',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew3,
				    this.onItem)
	            .item(204, 335, 'jew4',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew4,
				    this.onItem)
	            .item(300, 335, 'jew5',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew5,
				    this.onItem)
	            .item(395, 335, 'jew6',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Jew6,
				    this.onItem)
            .build()
            .page(GameConfig.PUB_MODE === PublishMode.NORMAL)
	            .pageShelf(178, 472,
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
	            .item(191, 103, 'mmmm',
				    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
				    GuiUtils.goCross('https://mycutegames.com/Games/Princess/Princess-Winter-Photoshoot.html'),
				    GuiUtils.addOverGlowHandler, GuiUtils.addOutGlowHandler)
	            .animatedItem(205, 124, 'mmmm_label',
				    ImageUtils.getSpritesheetClass('SpritesheetsMmmmT2914287').getName(),
				    arr, 10, true,
				    GuiUtils.goCross('https://mycutegames.com/Games/Princess/Princess-Winter-Photoshoot.html'), null, null)
            .build()
            .static()
	            .compoundItem(6, 1, -1, 0, 96, 'hair',
				    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames, 'Hair',
				    this.onItem)
            .build()
            .leftArrow(51, 344,
			    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(62, 473,
			    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .button(514, 119, 'ci_btn',
			    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBtn, this.changeDoll)
            .button(513, 241, 'ar_btn',
			    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBtn, this.changeDoll)
            .build();

	    // Dolls
	    this.cindy = new Doll(this, 581, 46)
            .layer(115, 21, 'hair_b',
			    'AtlasesDollCindy',
			    'HB', 'HB')
            .layer(15, 96, 'body',
			    'AtlasesDollCindy',
			    'Body', 'Body')
            .layer(-89, 133, 'dress',
			    'AtlasesDollCindy',
			    'D', 'D')
            .layer(48, 285, 'bot',
			    'AtlasesDollCindy',
			    'B', null)
            .layer(51, 141, 'top',
			    'AtlasesDollCindy',
			    'T', null)
            .layer(148, 21, 'head',
			    'AtlasesDollCindy',
			    'Head', 'Head')
            .layer(143, 93, 'jew',
			    'AtlasesDollCindy',
			    'J', null, true)
            .layer(100, -22, 'hair',
			    'AtlasesDollCindy',
			    'H', 'H')
            .layer(-24, 276, 'bag',
			    'AtlasesDollCindy',
			    'Bb', null, true)
            .layer(203, 30, 'hat',
			    'AtlasesDollCindy',
			    'Ht', null, true)
            .layer(137, 56, 'glass',
			    'AtlasesDollCindy',
			    'Gs', null, true);
	    this.ariel = new Doll(this, 581, 49)
            .layer(121, -22, 'hair_b',
			    'AtlasesDollAriel',
			    'HB', 'HB')
            .layer(0, 86, 'body',
			    'AtlasesDollAriel',
			    'Body', 'Body')
            .layer(138, 14, 'head',
			    'AtlasesDollAriel',
			    'Head', 'Head')
            .layer(-40, 134, 'dress',
			    'AtlasesDollAriel',
			    'D', 'D')
            .layer(36, 270, 'bot',
			    'AtlasesDollAriel',
			    'B', null)
            .layer(42, 139, 'top',
			    'AtlasesDollAriel',
			    'T', null)
            .layer(137, 82, 'jew',
			    'AtlasesDollAriel',
			    'J', null, true)
            .layer(115, 6, 'hair',
			    'AtlasesDollAriel',
			    'H', 'H')
            .layer(-21, 199, 'bag',
			    'AtlasesDollAriel',
			    'Bb', null, true)
            .layer(189, 9, 'hat',
			    'AtlasesDollAriel',
			    'Ht', null, true)
            .layer(139, 55, 'glass',
			    'AtlasesDollAriel',
			    'Gs', null, true);
	    this.belle = new Doll(this, 607, 38)
            .layer(76, -4, 'hair_b',
			    'AtlasesDollBelle',
			    'HB', 'HB')
            .layer(0, 91, 'body',
			    'AtlasesDollBelle',
			    'Body', 'Body')
            .layer(190, 282, 'bag',
			    'AtlasesDollBelle',
			    'Bb', null, true)
            .layer(103, 17, 'head',
			    'AtlasesDollBelle',
			    'Head', 'Head')
            .layer(3, 131, 'dress',
			    'AtlasesDollBelle',
			    'D', 'D')
            .layer(81, 279, 'bot',
			    'AtlasesDollBelle',
			    'B', null)
            .layer(61, 132, 'top',
			    'AtlasesDollBelle',
			    'T', null)
            .layer(111, 92, 'jew',
			    'AtlasesDollBelle',
			    'J', null, true)
            .layer(86, 5, 'hair',
			    'AtlasesDollBelle',
			    'H', 'H')
            .layer(90, 14, 'hat',
			    'AtlasesDollBelle',
			    'Ht', null, true)
            .layer(115, 62, 'glass',
			    'AtlasesDollBelle',
			    'Gs', null, true);
	
	    if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
		    this.chestAriel.findItem('mmmm_label').inputEnabled = false;
		    this.chestCindy.findItem('mmmm_label').inputEnabled = false;
		    this.chestBelle.findItem('mmmm_label').inputEnabled = false;
	    }

        this.ariel.hide(true);
        this.belle.hide(true);
        this.cindy.show(true);

        // GUI Buttons
	    this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
	    if (GameConfig.PUB_MODE !== PublishMode.DUW) {
		    this.gui.addExtraMoreAnimated(960 - 161, 720 - 152,
			    ImageUtils.getSpritesheetClass('SpritesheetsMoreE16115223').getName(),
			    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 8, true);
	    }
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Initalizations
        this.currentDoll = this.cindy;
        this.currentChest = this.chestCindy;

        // Animations goes here
	    TweenUtils.delayedCall(1000, this.chestCindy.show, this.chestCindy);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentDoll.on('dress', index, 'top', 'bot'))
                this.currentChest.onEquiped(name, 'dress', 'top', 'bot');
            // this.currentDoll.on('dress_b', index);
            this.currentDoll.on('dress_f', index);
	        if (this.currentDoll === this.ariel) this.arielDressed = true;
	        if (this.currentDoll === this.belle) this.belleDressed = true;
	        if (this.currentDoll === this.cindy) this.cindyDressed = true;
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress', 'dress_f'))
                this.currentChest.onEquiped(name, 'top', 'dress');
	        if (this.currentDoll === this.ariel) this.arielDressed = true;
	        if (this.currentDoll === this.belle) this.belleDressed = true;
	        if (this.currentDoll === this.cindy) this.cindyDressed = true;
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress', 'dress_f'))
                this.currentChest.onEquiped(name, 'bot', 'dress');
	        if (this.currentDoll === this.ariel) this.arielDressed = true;
	        if (this.currentDoll === this.belle) this.belleDressed = true;
	        if (this.currentDoll === this.cindy) this.cindyDressed = true;
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.currentChest.onEquiped(name, 'shoe');
        }
        else if (name.indexOf('jew') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('jew', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('hat', index);
            this.currentDoll.on('hat_b', index);
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('acs', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.currentDoll.on('bag', index);
            // this.currentDoll.on('bag_b', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glove', index);
        }
        else if (name.indexOf('sock') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('sock', index);
        }
        else if (name.indexOf('jack') !== -1) {
            index = parseInt(name.substr(4));
            this.currentDoll.on('jack', index);
        }
        else if (name.indexOf('neck') !== -1) {
	        index = parseInt(name.substr(4));
	        this.currentDoll.on('neck', index);
        }
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glass', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('hair', index)) {
                // this.currentChest.onEquiped(name, 'hair');
            }
            this.currentDoll.on('hair_b', index);
        }
        if (this.playBtn.alpha === 0 && this.arielDressed && this.belleDressed && this.cindyDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        if (sprite.name === 'ar_btn' && this.currentDoll === this.ariel) return;
        if (sprite.name === 'bl_btn'  && this.currentDoll === this.belle) return;
        if (sprite.name === 'ci_btn'  && this.currentDoll === this.cindy) return;
        if (this.changing) return;
        this.changing = true;
        this.currentDoll.hide();
        this.currentChest.hide();
        if (sprite.name === 'ci_btn') {
            this.currentDoll = this.cindy;
            this.currentChest = this.chestCindy;
        }
        else if (sprite.name === 'ar_btn') {
	        this.currentDoll = this.ariel;
	        this.currentChest = this.chestAriel;
        }
        else if (sprite.name === 'bl_btn') {
	        this.currentDoll = this.belle;
	        this.currentChest = this.chestBelle;
        }
	    this.game.time.events.add(Phaser.Timer.SECOND *  .5, () => {
            this.currentDoll.show();
            this.currentChest.show();
            this.game.time.events.add(Phaser.Timer.SECOND *  1, () => {
                this.changing = false;
                if (!this.adShowed) {
	                // Ad Calls
	                if (GameConfig.PUB_MODE === PublishMode.NORMAL ||
		                GameConfig.PUB_MODE === PublishMode.NO_BUTTONS ||
		                GameConfig.PUB_MODE === PublishMode.NO_BUTTONS_ONE_AD ||
		                GameConfig.PUB_MODE === PublishMode.DUW) {
		                AdUtils.playAds();
	                }
	                this.adShowed = true;
                }
            }, this);
        }, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.currentDoll = null;
        this.currentChest = null;

        this.chestAriel.dispose();
        this.chestCindy.dispose();
        this.chestBelle.dispose();

        if (this.bg) this.bg.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1 = this.cindy.extract();
        GameConfig.DOLL_2 = this.ariel.extract();
        GameConfig.DOLL_3 = this.belle.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.currentChest.disable();
        this.currentChest.hide();
        TweenUtils.moveInOut(this.currentDoll.getBody(), this.currentDoll.getBody().x - 250, this.currentDoll.getBody().y, Phaser.Timer.SECOND * 1);
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, () => {
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

