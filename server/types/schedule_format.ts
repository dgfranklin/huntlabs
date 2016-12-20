import * as moment from 'moment';
export namespace CalendarFormat {

    export type LUNCH_BLOCK_TYPE = "LUNCH_BLOCK_TYPE";
    export type PERIOD_BLOCK_TYPE = "PERIOD_BLOCK_TYPE";
    export type STATIC_BLOCK_TYPE = "STATIC_BLOCK_TYPE";

    export interface Calendar {
        days: CalendarDay[];
        scheduleTypes: { [name: string]: ScheduleType };
    }

    export interface CalendarDay {
        date: Date;
        cycleNumber: number;
        scheduleType: number | ScheduleType;
    }

    export interface ScheduleType {
        name: string;
        id: string;
        isDefault: boolean;
        isStandard: boolean;
        blocks: ScheduleBlock[];
    }


    interface ScheduleBaseBlock {
        defaultPeriod: number,
    }

    export interface SchedulePeriodBlock extends ScheduleBaseBlock {
        blockType: PERIOD_BLOCK_TYPE;
        endTime: moment.Moment,
        startTime: moment.Moment,
    }

    export interface ScheduleStaticBlock extends ScheduleBaseBlock {
        blockType: STATIC_BLOCK_TYPE;
        endTime: moment.Moment,
        startTime: moment.Moment,
        description: string,
    }

    export interface ScheduleLunchBlock extends ScheduleBaseBlock {
        blockType: LUNCH_BLOCK_TYPE;
        part0: {
            endTime: moment.Moment,
            startTime: moment.Moment,
        },
        part1: {
            endTime: moment.Moment,
            startTime: moment.Moment,
        },
    }

    export type ScheduleBlock = SchedulePeriodBlock | ScheduleStaticBlock | ScheduleLunchBlock;

    export function isPeriodScheduleBlock(block: ScheduleBlock): block is SchedulePeriodBlock {
        return block.blockType === "PERIOD_BLOCK_TYPE";
    }

    export function isLunchScheduleBlock(block: ScheduleBlock): block is ScheduleLunchBlock {
        return block.blockType === "LUNCH_BLOCK_TYPE";
    }

    export function isStaticScheduleBlock(block: ScheduleBlock): block is ScheduleStaticBlock {
        return block.blockType === "STATIC_BLOCK_TYPE";
    }

}
