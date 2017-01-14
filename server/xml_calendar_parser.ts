import { parseString, OptionsV2 as Xml2JsOptions } from 'xml2js';
import * as CalendarFormat from './types/calendar';
import * as XmlTypes from './types/xml_calendar';
import * as moment from 'moment';
import * as Q from 'q';

/** Options for XML parser which transform 'default' to 'isDefault' to avoid reserved words */
const xml2JsOptions: Xml2JsOptions = { tagNameProcessors: [fixDefaultTag] };

export function parseXmlCalendar(body: string): Q.Promise<CalendarFormat.Calendar> {
        const parseStringClosure = (callback: (err: any, res: any) => void) => parseString(body, xml2JsOptions, callback);
     return Q.nfcall(parseStringClosure).then(result => {
        const root = (result as XmlTypes.Calendar).root;
        const layouts: CalendarFormat.LayoutMap = {};
        root.scheduleTypes[0].scheduleType.map((scheduleType) => { 
            const parsedSchedule = parseScheduleType(scheduleType);
            layouts[parsedSchedule.metadata.id] = parsedSchedule;
        });
        const days: CalendarFormat.CalendarDay[] = 
            root.scheduleDays[0].scheduleDay.map((calendarDay) => parseCalendarDay(calendarDay, layouts));
        return {days, layouts};
    });
}

function parseCalendarDay(xmlCalendarDay: XmlTypes.CalendarDay, scheduleTypes: CalendarFormat.LayoutMap) : CalendarFormat.CalendarDay{
    const scheduleTypeName = xmlCalendarDay.scheduleType[0];
    if (scheduleTypes[scheduleTypeName] === null) {
        throw new Error ("Could not find schedule type: " + scheduleTypeName);
    }
    const cycleNumber = parseInt(xmlCalendarDay.dayNumber[0], 10);
    return {layoutId: scheduleTypeName, cycleNumber, date: parseDateString(xmlCalendarDay.date[0])};
}

function parseScheduleType(xmlScheduleType: XmlTypes.DayLayout): CalendarFormat.DayLayout {
    const isDefault = xmlScheduleType.isDefault[0] as string === 'true';
    const isStandard = xmlScheduleType.standard[0] === 'true';
    const id = xmlScheduleType.fullName[0];
    const name = (xmlScheduleType.displayName != null) ? xmlScheduleType.displayName[0] : id;
    const blocks: CalendarFormat.LayoutBlock[] = [];
    for (let xmlBlock of xmlScheduleType.layout[0].block) {
        let block: CalendarFormat.LayoutBlock;
        const defaultPeriod = parseInt(xmlBlock.defaultPeriod[0], 10);
        if (!isFinite(defaultPeriod)) {
            throw new Error("Could not parse period: " + xmlBlock.defaultPeriod[0]);
        }
        if (XmlTypes.isPeriodBlock(xmlBlock)) {
            block = { blockType: "PERIOD_BLOCK_TYPE", defaultPeriod, startTime: parseTimeString(xmlBlock.startTime[0]), endTime: (moment(xmlBlock.endTime[0])) };
        } else if (XmlTypes.isLunchBlock(xmlBlock)) {
            if (xmlBlock.part.length != 2) {
                throw new Error("Expected 2 parts in lunch block, but found " + xmlBlock.part.length);
            }
            const part0: CalendarFormat.LayoutLunchBlockPart = {endTime: parseTimeString(xmlBlock.part[0].endTime[0]), startTime: parseTimeString(xmlBlock.part[0].startTime[0])};
            const part1: CalendarFormat.LayoutLunchBlockPart = {endTime: parseTimeString(xmlBlock.part[1].endTime[0]), startTime: parseTimeString(xmlBlock.part[1].startTime[0])};
            block = {blockType: "LUNCH_BLOCK_TYPE", defaultPeriod, part0, part1};
        } else if (XmlTypes.isStaticBlock(xmlBlock)) {
            block = { blockType: "STATIC_BLOCK_TYPE", defaultPeriod, startTime: parseTimeString(xmlBlock.startTime[0]), endTime: (moment(xmlBlock.endTime[0])), description: "foo" };
        } else {
            throw new Error("Unexpected Block Type");
        }

        blocks.push(block);
    }
    return { metadata: {name: name, id: id, isDefault, isStandard}, blocks: blocks };
}

/** Transforms 'default' tag to 'isDefault' so as to not conflict with keyword */
function fixDefaultTag(tagName: string): string {
    return tagName === 'default' ? 'isDefault' : tagName;
}

/** Parse the time string, applyign appropriate transformations to handle time zones */
function parseTimeString(time: string): moment.Moment {
    return moment(time);
}

/** Parse the date string */
function parseDateString(date: string): moment.Moment {
    return moment(date);
}