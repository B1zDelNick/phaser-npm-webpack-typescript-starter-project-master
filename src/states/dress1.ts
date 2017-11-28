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

export default class Dress1 extends Phaser.State {

    private NEXT = 'Dress2';
    private nextPrepared = false;
    private changing = false;

    private currentChest: Chest = null;
    private currentGirl: Doll = null;
    private currentBoy: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private ariel: Doll = null;
    private eric: Doll = null;
    private avrora: Doll = null;
    private charm: Doll = null;
    private chestOne: Chest = null;
    private chestTwo: Chest = null;
    private bg: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private arBtn: Phaser.Button = null;
    private avBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;

    private arielDressed: boolean = false;
    private avroraDressed: boolean = false;
    private charmDressed: boolean = false;
    private ericDressed: boolean = false;

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
        this.avrora = null;
        this.changing = false;
        this.arielDressed = false;
        this.avroraDressed = false;
        this.charmDressed = false;
        this.ericDressed = false;
        this.currentBoy = null;
        this.currentGirl = null;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

        // Dolls
        this.charm = new Doll(this, 85, 62)
            .layer(21, 50, 'body',
                'AtlasesDollCharm',
                'Body', 'Body')
            .layer(178, 16, 'head',
                'AtlasesDollCharm',
                'Head', 'Head')
            .layer(60, 260, 'bot',
                'AtlasesDollCharm',
                'B', null)
            .layer(18, 546, 'shoe',
                'AtlasesDollCharm',
                'S', null)
            .layer(136, 106, 'top',
                'AtlasesDollCharm',
                'T', null)
            .layer(140, 86, 'jack',
                'AtlasesDollCharm',
                'Jk', null, true)
            .layer(183, 93, 'jew',
                'AtlasesDollCharm',
                'J', null, true)
            .layer(190, 75, 'neck',
                'AtlasesDollCharm',
                'Nk', null, true)
            .layer(165, -12, 'hair',
                'AtlasesDollCharm',
                'H', 'H')
            .layer(174, 42, 'glass',
                'AtlasesDollCharm',
                'Gs', null, true)
            .layer(155, -8, 'hat',
                'AtlasesDollCharm',
                'Ht', null, true);
        this.avrora = new Doll(this, 13, 94)
            .layer(-54, 11, 'hair_b',
                'AtlasesDollAvrora',
                'HB', 'HB')
            .layer(-1, 79, 'body',
                'AtlasesDollAvrora',
                'Body', 'Body')
            .layer(52, 267, 'sock',
                'AtlasesDollAvrora',
                'Sk', null, true)
            .layer(20, 114, 'lif',
                'AtlasesDollAvrora',
                'Lf', null, true)
            .layer(90, 23, 'head',
                'AtlasesDollAvrora',
                'Head', 'Head')
            .layer(54, 257, 'bot',
                'AtlasesDollAvrora',
                'B', null)
            .layer(48, 510, 'shoe',
                'AtlasesDollAvrora',
                'S', null)
            .layer(51, 449, 'acs',
                'AtlasesDollAvrora',
                'Ac', null)
            .layer(5, 122, 'top',
                'AtlasesDollAvrora',
                'T', null)
            .layer(16, 115, 'jack',
                'AtlasesDollAvrora',
                'Jk', null, true)
            .layer(107, 112, 'jew',
                'AtlasesDollAvrora',
                'J', null, true)
            .layer(88, 106, 'neck',
                'AtlasesDollAvrora',
                'Nk', null, true)
            .layer(15, 276, 'brace',
                'AtlasesDollAvrora',
                'Br', null, true)
            .layer(50, -14, 'hair',
                'AtlasesDollAvrora',
                'H', 'H')
            .layer(107, 55, 'glass',
                'AtlasesDollAvrora',
                'Gs', null, true)
            .layer(58, 3, 'hat',
                'AtlasesDollAvrora',
                'Ht', null, true);
        this.ariel = new Doll(this, 12, 90)
            .layer(110, 9, 'hair_b',
                'AtlasesDollAriel',
                'HB', 'HB')
            .layer(1, 55, 'body',
                'AtlasesDollAriel',
                'Body', 'Body')
            .layer(2, 228, 'sock',
                'AtlasesDollAriel',
                'Sk', null, true)
            .layer(121, 103, 'lif',
                'AtlasesDollAriel',
                'Lf', null, true)
            .layer(201, 24, 'head',
                'AtlasesDollAriel',
                'Head', 'Head')
            .layer(56, 214, 'bot',
                'AtlasesDollAriel',
                'B', null)
            .layer(-4, 302, 'shoe',
                'AtlasesDollAriel',
                'S', null)
            .layer(37, 329, 'acs',
                'AtlasesDollAriel',
                'Ac', null)
            .layer(122, 115, 'top',
                'AtlasesDollAriel',
                'T', null)
            .layer(120, 109, 'jack',
                'AtlasesDollAriel',
                'Jk', null, true)
            .layer(229, 101, 'jew',
                'AtlasesDollAriel',
                'J', null, true)
            .layer(211, 102, 'neck',
                'AtlasesDollAriel',
                'Nk', null, true)
            .layer(120, 220, 'brace',
                'AtlasesDollAriel',
                'Br', null, true)
            .layer(101, 2, 'hair',
                'AtlasesDollAriel',
                'H', 'H')
            .layer(236, 53, 'glass',
                'AtlasesDollAriel',
                'Gs', null, true)
            .layer(169, 0, 'hat',
                'AtlasesDollAriel',
                'Ht', null, true);
        this.eric = new Doll(this, 52, 93)
            .layer(0, 65, 'body',
                'AtlasesDollEric',
                'Body', 'Body')
            .layer(275, 18, 'head',
                'AtlasesDollEric',
                'Head', 'Head')
            .layer(64, 276, 'bot',
                'AtlasesDollEric',
                'B', null)
            .layer(4, 477, 'shoe',
                'AtlasesDollEric',
                'S', null)
            .layer(251, 103, 'top',
                'AtlasesDollEric',
                'T', null)
            .layer(276, 93, 'jack',
                'AtlasesDollEric',
                'Jk', null, true)
            .layer(277, 98, 'jew',
                'AtlasesDollEric',
                'J', null, true)
            .layer(291, 86, 'neck',
                'AtlasesDollEric',
                'Nk', null, true)
            .layer(267, 1, 'hair',
                'AtlasesDollEric',
                'H', 'H')
            .layer(277, 50, 'glass',
                'AtlasesDollEric',
                'Gs', null, true)
            .layer(269, 0, 'hat',
                'AtlasesDollEric',
                'Ht', null, true);

        // Chests
        this.chestOne = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(455, 65,
                ImageUtils.getImageClass('ImagesChest').getName(), null)
            .page()
                .pageShelf(500, 210,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(458, 345, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBot1,
                    this.onItem)
                .item(587, 345, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBot2,
                    this.onItem)
                .item(695, 345, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBot3,
                    this.onItem)
                .item(786, 345, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBot4,
                    this.onItem)
                .item(513, 209, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvTop1,
                    this.onItem)
                .item(601, 209, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvTop2,
                    this.onItem)
                .item(715, 211, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvTop3,
                    this.onItem)
                .item(778, 206, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvTop4,
                    this.onItem)
                .item(512, 540, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvShoe1,
                    this.onItem)
                .item(610, 555, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvShoe2,
                    this.onItem)
                .item(699, 553, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvShoe3,
                    this.onItem)
                .item(504, 20, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvHair1,
                    this.onItem)
                .item(606, -5, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvHair2,
                    this.onItem)
                .item(654, 27, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvHair3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(500, 210,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(489, 345, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBot5,
                    this.onItem)
                .item(597, 345, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBot6,
                    this.onItem)
                .item(699, 345, 'bot7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBot7,
                    this.onItem)
                .item(808, 348, 'bot8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBot8,
                    this.onItem)
                .item(523, 207, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvTop5,
                    this.onItem)
                .item(622, 206, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvTop6,
                    this.onItem)
                .item(678, 209, 'top7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvTop7,
                    this.onItem)
                .item(845, 208, 'top8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvTop8,
                    this.onItem)
                .item(526, 549, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvShoe4,
                    this.onItem)
                .item(633, 549, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvShoe5,
                    this.onItem)
                .item(416, 18, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvHair4,
                    this.onItem)
                .item(623, 6, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvHair5,
                    this.onItem)
                .item(735, 23, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvHair6,
                    this.onItem)
            .build()
            .page()
                .pageShelf(500, 210,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .item(458, 210, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvJack1,
                    this.onItem)
                .item(578, 211, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvJack2,
                    this.onItem)
                .item(634, 207, 'jack3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvJack3,
                    this.onItem)
                .item(490, 379, 'jack4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvJack4,
                    this.onItem)
                .item(585, 382, 'jack5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvJack5,
                    this.onItem)
                .item(751, 196, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
                    GuiUtils.goCross('http://mycutegames.com/Games/Princess/Anna-Social-Media-Butterfly.html'))
            .build()
            .page()
                .pageShelf(500, 210,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(510, 345, 'b_bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChBot1,
                    this.onItem)
                .item(606, 345, 'b_bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChBot2,
                    this.onItem)
                .item(705, 345, 'b_bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChBot3,
                    this.onItem)
                .item(792, 345, 'b_bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChBot4,
                    this.onItem)
                .item(524, 207, 'b_top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChTop1,
                    this.onItem)
                .item(650, 207, 'b_top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChTop2,
                    this.onItem)
                .item(725, 208, 'b_top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChTop3,
                    this.onItem)
                .item(832, 209, 'b_top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChTop4,
                    this.onItem)
                .item(512, 552, 'b_shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChShoe1,
                    this.onItem)
                .item(608, 560, 'b_shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChShoe2,
                    this.onItem)
                .item(702, 560, 'b_shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChShoe3,
                    this.onItem)
                .item(512, 29, 'b_hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChHair1,
                    this.onItem)
                .item(626, 23, 'b_hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChHair2,
                    this.onItem)
                .item(752, 28, 'b_hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChHair3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(513, 210,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(491, 258, 'b_jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChJack1,
                    this.onItem)
                .item(589, 258, 'b_jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChJack2,
                    this.onItem)
                .item(704, 256, 'b_jack3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChJack3,
                    this.onItem)
                .item(839, 258, 'b_jack4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChJack4,
                    this.onItem)
                .item(508, 563, 'b_shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChShoe4,
                    this.onItem)
                .item(617, 550, 'b_shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChShoe5,
                    this.onItem)
                .item(718, 548, 'b_shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChShoe6,
                    this.onItem)
                .item(515, 12, 'b_hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChHair4,
                    this.onItem)
                .item(627, 25, 'b_hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChHair5,
                    this.onItem)
                .item(745, 25, 'b_hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ChHair6,
                    this.onItem)
            .build()
            .leftArrow(421, 223,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(421, 325,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();
        this.chestTwo = new Chest(this, 700)
            .configure({hideSelected: true})
            .background(455, 65,
                ImageUtils.getImageClass('ImagesChest').getName(), null)
            .page()
                .pageShelf(500, 210,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(515, 348, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBot1,
                    this.onItem)
                .item(611, 349, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBot2,
                    this.onItem)
                .item(719, 347, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBot3,
                    this.onItem)
                .item(785, 346, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBot4,
                    this.onItem)
                .item(531, 207, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArTop1,
                    this.onItem)
                .item(619, 205, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArTop2,
                    this.onItem)
                .item(735, 207, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArTop3,
                    this.onItem)
                .item(833, 204, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArTop4,
                    this.onItem)
                .item(513, 541, 'shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArShoe1,
                    this.onItem)
                .item(609, 545, 'shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArShoe2,
                    this.onItem)
                .item(709, 539, 'shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArShoe3,
                    this.onItem)
                .item(513, 21, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArHair1,
                    this.onItem)
                .item(612, 8, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArHair2,
                    this.onItem)
                .item(714, 24, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArHair3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(500, 210,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(514, 349, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBot5,
                    this.onItem)
                .item(644, 352, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBot6,
                    this.onItem)
                .item(711, 349, 'bot7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBot7,
                    this.onItem)
                .item(806, 343, 'bot8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBot8,
                    this.onItem)
                .item(501, 204, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArTop5,
                    this.onItem)
                .item(631, 204, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArTop6,
                    this.onItem)
                .item(740, 207, 'top7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArTop7,
                    this.onItem)
                .item(731, 204, 'top8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArTop8,
                    this.onItem)
                .item(544, 544, 'shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArShoe4,
                    this.onItem)
                .item(649, 551, 'shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArShoe5,
                    this.onItem)
                .item(766, 7, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArHair6,
                    this.onItem)
                .item(613, 6, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArHair5,
                    this.onItem)
                .item(504, 21, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArHair4,
                    this.onItem)
            .build()
            .page()
                .pageShelf(500, 210,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .item(498, 208, 'jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArJack1,
                    this.onItem)
                .item(603, 205, 'jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArJack2,
                    this.onItem)
                .item(438, 375, 'jack3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArJack3,
                    this.onItem)
                .item(591, 373, 'jack4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArJack4,
                    this.onItem)
                .item(637, 370, 'jack5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArJack5,
                    this.onItem)
                .item(751, 196, 'mmmm',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Mmmm,
                    GuiUtils.goCross('http://mycutegames.com/Games/Princess/Anna-Social-Media-Butterfly.html'))
            .build()
            .page()
                .pageShelf(500, 210,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(470, 346, 'b_bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErBot1,
                    this.onItem)
                .item(563, 345, 'b_bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErBot2,
                    this.onItem)
                .item(671, 345, 'b_bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErBot3,
                    this.onItem)
                .item(770, 344, 'b_bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErBot4,
                    this.onItem)
                .item(546, 205, 'b_top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErTop1,
                    this.onItem)
                .item(657, 206, 'b_top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErTop2,
                    this.onItem)
                .item(762, 206, 'b_top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErTop3,
                    this.onItem)
                .item(848, 201, 'b_top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErTop4,
                    this.onItem)
                .item(509, 552, 'b_shoe1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErShoe1,
                    this.onItem)
                .item(604, 561, 'b_shoe2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErShoe2,
                    this.onItem)
                .item(701, 561, 'b_shoe3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErShoe3,
                    this.onItem)
                .item(501, 14, 'b_hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErHair1,
                    this.onItem)
                .item(620, 13, 'b_hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErHair2,
                    this.onItem)
                .item(727, 14, 'b_hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErHair3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(513, 210,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(490, 258, 'b_jack1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErJack1,
                    this.onItem)
                .item(589, 258, 'b_jack2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErJack2,
                    this.onItem)
                .item(704, 256, 'b_jack3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErJack3,
                    this.onItem)
                .item(839, 258, 'b_jack4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErJack4,
                    this.onItem)
                .item(508, 563, 'b_shoe4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErShoe4,
                    this.onItem)
                .item(613, 550, 'b_shoe5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErShoe5,
                    this.onItem)
                .item(718, 548, 'b_shoe6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErShoe6,
                    this.onItem)
                .item(515, 10, 'b_hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErHair4,
                    this.onItem)
                .item(627, 13, 'b_hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErHair5,
                    this.onItem)
                .item(739, 7, 'b_hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ErHair6,
                    this.onItem)
            .build()
            .leftArrow(421, 223,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(421, 325,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .build();

        /*if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            EffectUtils.makeScaleAnimation(this.chestOne.findItem('mmmm_btn'), 1.05, 500);
            EffectUtils.makeScaleAnimation(this.chestTwo.findItem('mmmm_btn'), 1.05, 500);
        }*/

        this.avrora.show(true);
        this.charm.show(true);
        this.ariel.hide(true);
        this.eric.hide(true);

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
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;
        this.arBtn = this.gui.addExtraBtn(390, 497,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBtn,
            this.changeDoll
        );
        this.avBtn = this.gui.addExtraBtn(390, 497,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBtn,
            this.changeDoll
        );
        this.arBtn.scale.setTo(0);
        this.arBtn.alpha = 0;
        this.avBtn.scale.setTo(0);
        this.avBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply

        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Initalizations
        this.currentChest = this.chestOne;
        this.currentGirl = this.avrora;
        this.currentBoy = this.charm;

        // Animations goes here
        TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, this.currentChest.show, this.currentChest);
        TweenUtils.fadeAndScaleIn(this.arBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadDress2State();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
        if (GameConfig.PUB_MODE === PublishMode.NORMAL ||
            GameConfig.PUB_MODE === PublishMode.NO_BUTTONS ||
            GameConfig.PUB_MODE === PublishMode.NO_BUTTONS_ONE_AD) {
            TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, AdUtils.playAds, this);
        }
    }

    private onItem(item: Phaser.Button): void {
        const name = item.name;
        let index: number;
        if (name.indexOf('dress') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentGirl.on('dress', index, 'top', 'bot'))
                this.currentChest.onEquiped(name, 'dress', 'top', 'bot');
            // this.currentPair.on('dress_b', index);
            // this.currentPair.on('dress_f', index);
        }
        else if (name.indexOf('b_top') !== -1) {
            index = parseInt(name.substr(5));
            if (this.currentBoy.on('top', index, 'dress'))
                this.currentChest.onEquiped(name, 'b_top', 'b_dress');
            if (this.currentBoy === this.charm) this.charmDressed = true;
            if (this.currentBoy === this.eric) this.ericDressed = true;
        }
        else if (name.indexOf('b_bot') !== -1) {
            console.log(name);
            index = parseInt(name.substr(5));
            if (this.currentBoy.on('bot', index, 'dress'))
                this.currentChest.onEquiped(name, 'b_bot', 'b_dress');
            if (this.currentBoy === this.charm) this.charmDressed = true;
            if (this.currentBoy === this.eric) this.ericDressed = true;
        }
        else if (name.indexOf('b_shoe') !== -1) {
            index = parseInt(name.substr(6));
            if (this.currentBoy.on('shoe', index))
                this.currentChest.onEquiped(name, 'b_shoe');
        }
        else if (name.indexOf('b_jack') !== -1) {
            index = parseInt(name.substr(6));
            this.currentBoy.on('jack', index);
        }
        else if (name.indexOf('b_hair') !== -1) {
            index = parseInt(name.substr(6));
            if (this.currentBoy.on('hair', index)) {
                this.currentChest.onEquiped(name, 'b_hair');
            }
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentGirl.on('top', index, 'dress'))
                this.currentChest.onEquiped(name, 'top', 'dress');
            if (this.currentGirl === this.ariel) this.arielDressed = true;
            if (this.currentGirl === this.avrora) this.avroraDressed = true;
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentGirl.on('bot', index, 'dress'))
                this.currentChest.onEquiped(name, 'bot', 'dress');
            if (this.currentGirl === this.ariel) this.arielDressed = true;
            if (this.currentGirl === this.avrora) this.avroraDressed = true;
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentGirl.on('shoe', index))
                this.currentChest.onEquiped(name, 'shoe');
        }
        else if (name.indexOf('jew') !== -1) {
            index = parseInt(name.substr(3));
            this.currentGirl.on('jew', index);
        }
        else if (name.indexOf('hat') !== -1) {
            index = parseInt(name.substr(3));
            this.currentGirl.on('hat', index);
            // this.currentGirl.on('hat_b', index);
        }
        else if (name.indexOf('acs') !== -1) {
            index = parseInt(name.substr(3));
            this.currentGirl.on('acs', index);
        }
        else if (name.indexOf('lif') !== -1) {
            index = parseInt(name.substr(3));
            this.currentGirl.on('lif', index);
        }
        else if (name.indexOf('bag') !== -1) {
            index = parseInt(name.substr(3));
            this.currentGirl.on('bag', index);
            // this.currentPair.on('bag_b', index);
        }
        else if (name.indexOf('glove') !== -1) {
            index = parseInt(name.substr(5));
            this.currentGirl.on('glove', index);
        }
        else if (name.indexOf('sock') !== -1) {
            index = parseInt(name.substr(4));
            this.currentGirl.on('sock', index);
        }
        else if (name.indexOf('jack') !== -1) {
            index = parseInt(name.substr(4));
            this.currentGirl.on('jack', index);
        }
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.currentGirl.on('glass', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentGirl.on('hair', index)) {
                this.currentChest.onEquiped(name, 'hair');
            }
            this.currentGirl.on('hair_b', index);
        }

        if (this.playBtn.alpha === 0 && this.arielDressed && this.avroraDressed && this.charmDressed && this.ericDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        if (sprite === this.arBtn && this.currentGirl === this.ariel) return;
        if (sprite === this.avBtn && this.currentGirl === this.avrora) return;
        if (this.changing) return;
        this.changing = true;
        this.currentGirl.hide();
        this.currentBoy.hide();
        this.currentChest.hide();
        if (this.currentGirl === this.ariel) {
            TweenUtils.fadeAndScaleOut(this.avBtn, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0);
            TweenUtils.fadeAndScaleIn(this.arBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.5);
            this.currentGirl = this.avrora;
            this.currentBoy = this.charm;
            this.currentChest = this.chestOne;
        } else {
            TweenUtils.fadeAndScaleOut(this.arBtn, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 0);
            TweenUtils.fadeAndScaleIn(this.avBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.5);
            this.currentGirl = this.ariel;
            this.currentBoy = this.eric;
            this.currentChest = this.chestTwo;
        }
        this.game.time.events.add(Phaser.Timer.SECOND *  .5, () => {
            this.currentGirl.show();
            this.currentBoy.show();
            this.currentChest.show();
            this.game.time.events.add(Phaser.Timer.SECOND *  1, () => {
                this.changing = false;
            }, this);
        }, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        this.currentGirl = null;
        this.currentBoy = null;
        this.currentChest = null;

        this.chestOne.dispose();
        this.chestTwo.dispose();

        if (this.bg) this.bg.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_2 = this.ariel.extract();
        GameConfig.DOLL_1 = this.avrora.extract();
        GameConfig.DOLL_3 = this.charm.extract();
        GameConfig.DOLL_4 = this.eric.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.currentChest.disable();
        this.currentChest.hide();
        TweenUtils.fadeAndScaleOut(this.arBtn);
        TweenUtils.fadeAndScaleOut(this.avBtn);
        TweenUtils.move(
            this.currentGirl.getBody(),
            this.currentGirl.getBody().x + 200,
            this.currentGirl.getBody().y,
            Phaser.Timer.SECOND * 1);
        TweenUtils.move(
            this.currentBoy.getBody(),
            this.currentBoy.getBody().x + 200,
            this.currentBoy.getBody().y,
            Phaser.Timer.SECOND * 1);
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

