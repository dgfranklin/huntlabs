interface BaseBlock {
    defaultPeriod: string[],
    type: string[]
}

export interface PeriodBlock extends BaseBlock {
    endTime: string[],
    startTime: string[],
    foo: string[],
}

export interface StaticBlock extends BaseBlock {
    endTime: string[],
    startTime: string[],
    name: string[],
}

export interface LunchBlock extends BaseBlock  {
    part: [
        {
            endTime: string[],
            startTime: string[],
        }
    ]
}

export type Block = PeriodBlock | StaticBlock | LunchBlock;

export function isPeriodBlock(block: Block): block is PeriodBlock {
    return block.type[0] === 'period';
}

export function isLunchBlock(block: Block): block is LunchBlock {
    return block.type[0] === 'lunch';
}

export function isStaticBlock(block: Block): block is StaticBlock {
    return block.type[0] === 'static';
}

export interface DayLayout {
    // This is remapped from "default" by the parser.
    isDefault: string[],
    fullName: string[],
    displayName?: string[],
    layout: [
        {
            block: Block[]
        }
    ]
    standard: string[],

}

export interface CalendarDay {
    date: string[],
    dayNumber: string[],
    scheduleType: string[],
}

/** The format expected from the parser result. 2JS forces everything to an array since  does distinguish between an array of size one and standalone attibute.*/
export interface Calendar {
    root: {
        scheduleDays: [
            {
                scheduleDay: CalendarDay[]
            }
        ]
        scheduleTypes: [
            {
                scheduleType: DayLayout[]
            }
        ]
    };
}