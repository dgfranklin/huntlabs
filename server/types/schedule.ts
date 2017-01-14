import * as moment from 'moment';
import {DayLayoutMetadata, CalendarDay} from './calendar';

export interface ScheduleDay {
    calendarDay: CalendarDay;
    layoutMetadata: DayLayoutMetadata;
    blocks: ScheduleBlock[];
}

export interface ScheduleBlock {
    name: string; 
    startTime: moment.Moment;
    endTime: moment.Moment;
}