import * as moment from 'moment';
    export type LUNCH_BLOCK_TYPE = "LUNCH_BLOCK_TYPE";
    export type PERIOD_BLOCK_TYPE = "PERIOD_BLOCK_TYPE";
    export type STATIC_BLOCK_TYPE = "STATIC_BLOCK_TYPE";

    export type LayoutMap = { [name: string]: DayLayout }

    export interface Calendar {
        days: CalendarDay[];
        layouts: LayoutMap;
    }

    export interface CalendarDay {
        date: moment.Moment;
        cycleNumber: number;
        layoutId: string;
    }

    export interface DayLayoutMetadata {
        name: string;
        id: string;
        isDefault: boolean;
        isStandard: boolean;
    }

    export interface DayLayout{
        blocks: LayoutBlock[];
        metadata: DayLayoutMetadata;
    }

    interface LayoutBaseBlock {
        defaultPeriod: number,
    }

    export interface LayoutPeriodBlock extends LayoutBaseBlock {
        blockType: PERIOD_BLOCK_TYPE;
        endTime: moment.Moment,
        startTime: moment.Moment,
    }

    export interface LayoutStaticBlock extends LayoutBaseBlock {
        blockType: STATIC_BLOCK_TYPE;
        endTime: moment.Moment,
        startTime: moment.Moment,
        description: string,
    }

    export interface LayoutLunchBlockPart {
        endTime: moment.Moment,
        startTime: moment.Moment,
    }
    export interface LayoutLunchBlock extends LayoutBaseBlock {
        blockType: LUNCH_BLOCK_TYPE;
        part0: LayoutLunchBlockPart
        part1: LayoutLunchBlockPart;
    }

    export type LayoutBlock = LayoutPeriodBlock | LayoutStaticBlock | LayoutLunchBlock;

    export function isPeriodLayoutBlock(block: LayoutBlock): block is LayoutPeriodBlock {
        return block.blockType === "PERIOD_BLOCK_TYPE";
    }

    export function isLunchLayoutBlock(block: LayoutBlock): block is LayoutLunchBlock {
        return block.blockType === "LUNCH_BLOCK_TYPE";
    }

    export function isStaticLayoutBlock(block: LayoutBlock): block is LayoutStaticBlock {
        return block.blockType === "STATIC_BLOCK_TYPE";
    }
