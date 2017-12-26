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

    private NEXT = 'Final';
    private nextPrepared = false;
    private changing = false;

    private currentDoll: Doll = null;

    private gui: IGui = null;
    private saver: ISaver = null;
    private ariel: Doll = null;
    private jas: Doll = null;
    private avrora: Doll = null;
    private chestAriel: Chest = null;
    private chestJas: Chest = null;
    private chestAvrora: Chest = null;
    private bg: Phaser.Sprite = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private playBtn: Phaser.Button = null;

    private arielDressed: boolean = false;
    private jasDressed: boolean = false;
    private avroraDressed: boolean = false;

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
        this.jas = null;
        this.avrora = null;
        this.changing = false;
        this.arielDressed = false;
        this.jasDressed = false;
        this.avroraDressed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg4').getName());

        // Chests
        this.chestAvrora = new Chest(this, -700)
            .configure({hideSelected: true})
            .background(498, -16,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .pageShelf(563, 206,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .pageShelf(563, 386,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .item(716, 44, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hair3,
                    this.onItem)
                .item(608, 47, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hair2,
                    this.onItem)
                .item(474, 47, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hair1,
                    this.onItem)
                .item(558, 374, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top4,
                    this.onItem)
                .item(663, 372, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top5,
                    this.onItem)
                .item(772, 373, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top6,
                    this.onItem)
                .item(566, 195, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top1,
                    this.onItem)
                .item(667, 197, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top2,
                    this.onItem)
                .item(733, 196, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Top3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(563, 206,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .pageShelf(563, 386,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .item(558, 45, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hair4,
                    this.onItem)
                .item(719, 42, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hair6,
                    this.onItem)
                .item(671, 20, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hair5,
                    this.onItem)
                .item(551, 412, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot4,
                    this.onItem)
                .item(646, 412, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot5,
                    this.onItem)
                .item(738, 412, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot6,
                    this.onItem)
                .item(577, 193, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot1,
                    this.onItem)
                .item(653, 193, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot2,
                    this.onItem)
                .item(776, 193, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Bot3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(552, 190,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .pageShelf(552, 384,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(579, 57, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat1,
                    this.onItem)
                .item(677, 73, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat2,
                    this.onItem)
                .item(772, 61, 'hat3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat3,
                    this.onItem)
                .item(573, 259, 'hat4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat4,
                    this.onItem)
                .item(650, 261, 'hat5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat5,
                    this.onItem)
                .item(758, 245, 'hat6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat6,
                    this.onItem)
                .compoundItem(9, 1, -1, 559, 459, 'jew',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'Jew',
                    this.onItem)
                .compoundItem(9, 1, -1, 666, 459, 'neck',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'Neck',
                    this.onItem)
            .build()
            .page()
                .pageShelf(552, 105,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .pageShelf(552, 190,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(624, 70, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove1,
                    this.onItem)
                .item(704, 62, 'glove2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove2,
                    this.onItem)
                .item(556, 149, 'glove3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove3,
                    this.onItem)
                .item(633, 163, 'glove4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove4,
                    this.onItem)
                .item(713, 159, 'glove5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove5,
                    this.onItem)
                .item(798, 157, 'glove6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove6,
                    this.onItem)
                .item(594, 235, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs1,
                    this.onItem)
                .item(678, 258, 'acs2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs2,
                    this.onItem)
                .item(758, 253, 'acs3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs3,
                    this.onItem)
            .build()
            .page()
            .pageShelf(552, 168,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
            .pageShelf(552, 428,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
            .item(571, 125, 'acs4',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs4,
                this.onItem)
            .item(667, 120, 'acs5',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs5,
                this.onItem)
            .item(782, 119, 'acs6',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs6,
                this.onItem)
            .item(591, 305, 'acs7',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs7,
                this.onItem)
            .item(674, 317, 'acs8',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs8,
                this.onItem)
            .item(796, 291, 'acs9',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs9,
                this.onItem)
            .animatedItem(520, 486, 'mmmm',
                ImageUtils.getSpritesheetClass('SpritesheetsMmmm2872204').getName(),
                [0, 1, 2, 3], 10,
                GuiUtils.goLinkInMoreGames)
            .build()
            .leftArrow(445, 230,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(883, 230,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .button(419, 351, 'jas_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.JasBtn, this.changeDoll)
            .button(418, 503, 'ar_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.ArBtn, this.changeDoll)
            .build();
        this.chestAriel = new Chest(this, -700)
            .configure({hideSelected: true})
            .background(498, -16,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .pageShelf(563, 206,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .pageShelf(563, 386,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .item(743, 28, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair3,
                    this.onItem)
                .item(665, 11, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair2,
                    this.onItem)
                .item(568, 17, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair1,
                    this.onItem)
                .item(641, 375, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top4,
                    this.onItem)
                .item(665, 379, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top5,
                    this.onItem)
                .item(780, 378, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top6,
                    this.onItem)
                .item(545, 196, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top1,
                    this.onItem)
                .item(667, 197, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top2,
                    this.onItem)
                .item(777, 200, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Top3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(563, 206,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .pageShelf(563, 386,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .item(535, 49, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair4,
                    this.onItem)
                .item(658, 34, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair5,
                    this.onItem)
                .item(754, 49, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Hair6,
                    this.onItem)
                .item(562, 402, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot4,
                    this.onItem)
                .item(633, 404, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot5,
                    this.onItem)
                .item(739, 401, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot6,
                    this.onItem)
                .item(559, 198, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot1,
                    this.onItem)
                .item(676, 200, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot2,
                    this.onItem)
                .item(707, 200, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress2').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress2').Frames.Bot3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(552, 190,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .pageShelf(552, 384,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(579, 57, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat1,
                    this.onItem)
                .item(677, 73, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat2,
                    this.onItem)
                .item(772, 61, 'hat3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat3,
                    this.onItem)
                .item(573, 259, 'hat4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat4,
                    this.onItem)
                .item(650, 261, 'hat5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat5,
                    this.onItem)
                .item(758, 245, 'hat6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat6,
                    this.onItem)
                .compoundItem(9, 1, -1, 559, 459, 'jew',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'Jew',
                    this.onItem)
                .compoundItem(9, 1, -1, 666, 459, 'neck',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'Neck',
                    this.onItem)
            .build()
            .page()
                .pageShelf(552, 105,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .pageShelf(552, 190,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(624, 70, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove1,
                    this.onItem)
                .item(704, 62, 'glove2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove2,
                    this.onItem)
                .item(556, 149, 'glove3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove3,
                    this.onItem)
                .item(633, 163, 'glove4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove4,
                    this.onItem)
                .item(713, 159, 'glove5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove5,
                    this.onItem)
                .item(798, 157, 'glove6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove6,
                    this.onItem)
                .item(594, 235, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs1,
                    this.onItem)
                .item(678, 258, 'acs2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs2,
                    this.onItem)
                .item(758, 253, 'acs3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(552, 168,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .pageShelf(552, 428,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(571, 125, 'acs4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs4,
                    this.onItem)
                .item(667, 120, 'acs5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs5,
                    this.onItem)
                .item(782, 119, 'acs6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs6,
                    this.onItem)
                .item(591, 305, 'acs7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs7,
                    this.onItem)
                .item(674, 317, 'acs8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs8,
                    this.onItem)
                .item(796, 291, 'acs9',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs9,
                    this.onItem)
                .animatedItem(520, 486, 'mmmm',
                    ImageUtils.getSpritesheetClass('SpritesheetsMmmm2872204').getName(),
                    [0, 1, 2, 3], 10,
                    GuiUtils.goLinkInMoreGames)
            .build()
            .leftArrow(445, 230,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(883, 230,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .button(419, 351, 'jas_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBtn, this.changeDoll)
            .button(418, 503, 'ar_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.JasBtn, this.changeDoll)
            .build();
        this.chestJas = new Chest(this, -700)
            .configure({hideSelected: true})
            .background(498, -16,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Chest)
            .page()
                .pageShelf(563, 206,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .pageShelf(563, 386,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .item(743, 28, 'hair3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Hair3,
                    this.onItem)
                .item(665, 11, 'hair2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Hair2,
                    this.onItem)
                .item(568, 17, 'hair1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Hair1,
                    this.onItem)
                .item(641, 375, 'top4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top4,
                    this.onItem)
                .item(665, 379, 'top5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top5,
                    this.onItem)
                .item(780, 378, 'top6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top6,
                    this.onItem)
                .item(545, 196, 'top1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top1,
                    this.onItem)
                .item(667, 197, 'top2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top2,
                    this.onItem)
                .item(777, 200, 'top3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Top3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(563, 206,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .pageShelf(563, 386,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf2)
                .item(535, 49, 'hair4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Hair4,
                    this.onItem)
                .item(658, 34, 'hair5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Hair5,
                    this.onItem)
                .item(754, 49, 'hair6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Hair6,
                    this.onItem)
                .item(562, 402, 'bot4',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot4,
                    this.onItem)
                .item(633, 404, 'bot5',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot5,
                    this.onItem)
                .item(739, 401, 'bot6',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot6,
                    this.onItem)
                .item(559, 198, 'bot1',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot1,
                    this.onItem)
                .item(676, 200, 'bot2',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot2,
                    this.onItem)
                .item(707, 200, 'bot3',
                    ImageUtils.getAtlasClass('AtlasesStateDress3').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress3').Frames.Bot3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(552, 190,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .pageShelf(552, 384,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(579, 57, 'hat1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat1,
                    this.onItem)
                .item(677, 73, 'hat2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat2,
                    this.onItem)
                .item(772, 61, 'hat3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat3,
                    this.onItem)
                .item(573, 259, 'hat4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat4,
                    this.onItem)
                .item(650, 261, 'hat5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat5,
                    this.onItem)
                .item(758, 245, 'hat6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Hat6,
                    this.onItem)
                .compoundItem(9, 1, -1, 559, 459, 'jew',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'Jew',
                    this.onItem)
                .compoundItem(9, 1, -1, 666, 459, 'neck',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames, 'Neck',
                    this.onItem)
            .build()
            .page()
                .pageShelf(552, 105,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .pageShelf(552, 190,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(624, 70, 'glove1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove1,
                    this.onItem)
                .item(704, 62, 'glove2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove2,
                    this.onItem)
                .item(556, 149, 'glove3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove3,
                    this.onItem)
                .item(633, 163, 'glove4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove4,
                    this.onItem)
                .item(713, 159, 'glove5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove5,
                    this.onItem)
                .item(798, 157, 'glove6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Glove6,
                    this.onItem)
                .item(594, 235, 'acs1',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs1,
                    this.onItem)
                .item(678, 258, 'acs2',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs2,
                    this.onItem)
                .item(758, 253, 'acs3',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs3,
                    this.onItem)
            .build()
            .page()
                .pageShelf(552, 168,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .pageShelf(552, 428,
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Shelf1)
                .item(571, 125, 'acs4',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs4,
                    this.onItem)
                .item(667, 120, 'acs5',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs5,
                    this.onItem)
                .item(782, 119, 'acs6',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs6,
                    this.onItem)
                .item(591, 305, 'acs7',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs7,
                    this.onItem)
                .item(674, 317, 'acs8',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs8,
                    this.onItem)
                .item(796, 291, 'acs9',
                    ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                    ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Acs9,
                    this.onItem)
                .animatedItem(520, 486, 'mmmm',
                    ImageUtils.getSpritesheetClass('SpritesheetsMmmm2872204').getName(),
                    [0, 1, 2, 3], 10,
                    GuiUtils.goLinkInMoreGames)
            .build()
            .leftArrow(445, 230,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Lb)
            .rightArrow(883, 230,
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Rb)
            .button(419, 351, 'jas_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.AvBtn, this.changeDoll)
            .button(418, 503, 'ar_btn',
                ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
                ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.JasBtn, this.changeDoll)
            .build();

        // Dolls
        this.ariel = new Doll(this, 513, 49)
            .layer(0, 0, 'hat_b',
                'AtlasesDollJas',
                'HtB', null, true)
            .layer(0, 0, 'hair_b',
                'AtlasesDollJas',
                'HB', 'HB1')
            .layer(0, 0, 'neck_b',
                'AtlasesDollJas',
                'NkB', null, true)
            .layer(0, 0, 'jack_b',
                'AtlasesDollJas',
                'JkB', null, true)
            .layer(0, 0, 'body',
                'AtlasesDollJas',
                'Body', 'Body')
            .layer(0, 0, 'und',
                'AtlasesDollJas',
                'Und', 'Und')
            .layer(0, 0, 'sock',
                'AtlasesDollJas',
                'Sk', null, true)
            .layer(0, 0, 'shoe',
                'AtlasesDollJas',
                'S', null)
            .layer(0, 0, 'dress',
                'AtlasesDollJas',
                'D', null)
            .layer(0, 0, 'bot',
                'AtlasesDollJas',
                'B', null)
            .layer(0, 0, 'top',
                'AtlasesDollJas',
                'T', null)
            .layer(0, 0, 'jack',
                'AtlasesDollJas',
                'Jk', null, true)
            .layer(0, 0, 'glass',
                'AtlasesDollJas',
                'Gs', null, true)
            .layer(0, 0, 'neck',
                'AtlasesDollJas',
                'Nk', null, true)
            .layer(0, 0, 'bag',
                'AtlasesDollJas',
                'Bb', null, true)
            .layer(0, 0, 'hair',
                'AtlasesDollJas',
                'H', 'H1')
            .layer(0, 0, 'hat',
                'AtlasesDollJas',
                'Ht', null, true)
            .layer(0, 0, 'hand',
                'AtlasesDollJas',
                'Hand', 'Hand')
            .layer(0, 0, 'dress_f',
                'AtlasesDollJas',
                'DF', null);
        this.jas = new Doll(this, 491, 49)
            .layer(0, 0, 'hat_b',
                'AtlasesDollPoc',
                'HtB', null, true)
            .layer(0, 0, 'hair_b',
                'AtlasesDollPoc',
                'HB', 'HB1')
            .layer(0, 0, 'neck_b',
                'AtlasesDollPoc',
                'NkB', null, true)
            .layer(0, 0, 'jack_b',
                'AtlasesDollPoc',
                'JkB', null, true)
            .layer(0, 0, 'body',
                'AtlasesDollPoc',
                'Body', 'Body')
            .layer(0, 0, 'und',
                'AtlasesDollPoc',
                'Und', 'Und')
            .layer(0, 0, 'sock',
                'AtlasesDollPoc',
                'Sk', null, true)
            .layer(0, 0, 'shoe',
                'AtlasesDollPoc',
                'S', null)
            .layer(0, 0, 'dress',
                'AtlasesDollPoc',
                'D', null)
            .layer(0, 0, 'bot',
                'AtlasesDollPoc',
                'B', null)
            .layer(0, 0, 'top',
                'AtlasesDollPoc',
                'T', null)
            .layer(0, 0, 'jack',
                'AtlasesDollPoc',
                'Jk', null, true)
            .layer(0, 0, 'glass',
                'AtlasesDollPoc',
                'Gs', null, true)
            .layer(0, 0, 'neck',
                'AtlasesDollPoc',
                'Nk', null, true)
            .layer(0, 0, 'bag',
                'AtlasesDollPoc',
                'Bb', null, true)
            .layer(0, 0, 'hair',
                'AtlasesDollPoc',
                'H', 'H1')
            .layer(0, 0, 'hat',
                'AtlasesDollPoc',
                'Ht', null, true)
            .layer(0, 0, 'hand',
                'AtlasesDollPoc',
                'Hand', 'Hand')
            .layer(0, 0, 'dress_f',
                'AtlasesDollPoc',
                'DF', null);

        this.girl = this.game.add.sprite(168 - 700, 197,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Gr2);
        this.cloud = this.game.add.sprite(445, 108,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.Cl2);

        this.cloud.alpha = 0;
        this.ariel.show(true);
        this.jas.hide(true);
        this.chest.disable();
        this.ariel.getBody().x += 700;

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
        this.jsBtn = this.gui.addExtraBtn(428, -6,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.JsBtn,
            this.changeDoll
        );
        this.pcBtn = this.gui.addExtraBtn(428, -6,
            ImageUtils.getAtlasClass('AtlasesStateDress1').getName(),
            ImageUtils.getAtlasClass('AtlasesStateDress1').Frames.PcBtn,
            this.changeDoll
        );
        this.jsBtn.scale.setTo(0);
        this.jsBtn.alpha = 0;
        this.pcBtn.scale.setTo(0);
        this.pcBtn.alpha = 0;
        this.beginBtn = this.gui.addExtraBtn(560, 280,
            ImageUtils.getAtlasClass('AtlasesStateShop').getName(),
            ImageUtils.getAtlasClass('AtlasesStateShop').Frames.Go, () => {
                TweenUtils.fadeAndScaleOut(this.beginBtn);
                TweenUtils.fadeOut(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .5);
                TweenUtils.moveOut(this.girl, 168 - 700, 197, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                TweenUtils.moveIn(this.ariel.getBody(), 513, 49, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
                TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
                    this.chest.show();
                    this.chest.enable();
                }, this);
                TweenUtils.fadeAndScaleIn(this.pcBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2);
            },
            GuiUtils.addOverHandler,
            GuiUtils.addOutHandler
        );
        this.beginBtn.scale.setTo(0);
        this.beginBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Initalizations
        this.currentDoll = this.ariel;

        // Animations goes here
        TweenUtils.moveIn(this.girl, 168, 197, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 2);
        TweenUtils.fadeIn(this.cloud, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 3);
        TweenUtils.fadeAndScaleIn(this.beginBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 4);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            PreloaderUtils.preloadResultState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }

        // Ad Calls
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
            if (this.currentDoll.on('dress', index, 'top', 'bot'))
                this.chest.onEquiped(name, 'dress', 'top', 'bot');
            // this.currentDoll.on('dress_b', index);
            this.currentDoll.on('dress_f', index);
        }
        else if (name.indexOf('top') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('top', index, 'dress', 'dress_f'))
                this.chest.onEquiped(name, 'top', 'dress');
        }
        else if (name.indexOf('bot') !== -1) {
            index = parseInt(name.substr(3));
            if (this.currentDoll.on('bot', index, 'dress', 'dress_f'))
                this.chest.onEquiped(name, 'bot', 'dress');
        }
        else if (name.indexOf('shoe') !== -1) {
            index = parseInt(name.substr(4));
            if (this.currentDoll.on('shoe', index))
                this.chest.onEquiped(name, 'shoe');
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
        else if (name.indexOf('glass') !== -1) {
            index = parseInt(name.substr(5));
            this.currentDoll.on('glass', index);
        }
        else if (name.indexOf('hair') !== -1) {
            index = parseInt(name.substr(7));
            if (this.currentDoll.on('hair', index)) {
                // this.currentChest.onEquiped(name, 'hair');
            }
            this.currentDoll.on('hair_b', index);
        }

        if (this.currentDoll === this.ariel) this.arielDressed = true;
        if (this.currentDoll === this.jas) this.jasDressed = true;

        if (this.playBtn.alpha === 0 && this.arielDressed && this.jasDressed) {
            TweenUtils.fadeAndScaleIn(this.playBtn);
        }
    }

    private changeDoll(sprite: Phaser.Button): void {
        if (sprite === this.jsBtn && this.currentDoll === this.ariel) return;
        if (sprite === this.pcBtn && this.currentDoll === this.jas) return;
        if (this.changing) return;
        this.changing = true;
        this.currentDoll.hide();
        if (this.currentDoll === this.ariel) {
            TweenUtils.fadeAndScaleIn(this.jsBtn);
            TweenUtils.fadeAndScaleOut(this.pcBtn);
            this.currentDoll = this.jas;
            this.chest.findItem('pc_hair').visible = true;
            this.chest.findItem('js_hair').visible = false;
        } else {
            TweenUtils.fadeAndScaleOut(this.jsBtn);
            TweenUtils.fadeAndScaleIn(this.pcBtn);
            this.currentDoll = this.ariel;
            this.chest.findItem('pc_hair').visible = false;
            this.chest.findItem('js_hair').visible = true;
        }
        this.game.time.events.add(Phaser.Timer.SECOND *  .5, () => {
            this.currentDoll.show();
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

        this.currentDoll = null;

        this.chest.dispose();

        if (this.bg) this.bg.destroy(true);
        if (this.cloud) this.cloud.destroy(true);
        if (this.girl) this.cloud.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        GameConfig.DOLL_1 = this.ariel.extract();
        GameConfig.DOLL_2 = this.jas.extract();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
        this.chest.disable();
        this.chest.hide();
        TweenUtils.fadeAndScaleOut(this.jsBtn);
        TweenUtils.fadeAndScaleOut(this.pcBtn);
        TweenUtils.moveInOut(this.currentDoll.getBody(), this.currentDoll.getBody().x - 170, this.currentDoll.getBody().y, Phaser.Timer.SECOND * 1);
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

