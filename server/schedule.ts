import { parseString, OptionsV2 as Xml2JsOptions } from 'xml2js';
import { CalendarFormat } from './types/schedule_format';
import * as XmlTypes from './types/xml_format';
import * as moment from 'moment';
import * as Q from 'q';
import * as http from 'http';

/** Options for XML parser which transform 'default' to 'isDefault'*/
const xml2JsOptions: Xml2JsOptions = { tagNameProcessors: [fixDefaultTag] };

class ScheduleXmlParser {
    constructor(private url: string) { }

    getCalendar() {
        return getFile(this.url).then(parseBody);
    }
}

function getFile(url: string): Q.Promise<string> {
    let body = '';
    const deferred = Q.defer<string>();
    http.get(this.url, (res) => {
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            deferred.resolve(body);
        });
        res.resume();
    });
    return deferred.promise;
}

function parseBody(body: string): Q.IPromise<any> {
    const parseStringClosure = (callback: (err: any, res: any) => void) => parseString(body, xml2JsOptions, callback);
    return Q.nfcall(parseStringClosure).then(result => {
        const root = (result as XmlTypes.Schedule).root;
        const scheduleTypes: { [key: string]: CalendarFormat.ScheduleType } = {};
        root.scheduleTypes[0].scheduleType.map((xmlSchedule) => { 
            const parsedSchedule = parseScheduleType(xmlSchedule);
            scheduleTypes[parsedSchedule.id] = parsedSchedule;
        });
        const days: CalendarFormat.CalendarDay[] = [];
        return {days, scheduleTypes};
    });
}

function parseScheduleType(xmlScheduleType: XmlTypes.ScheduleType): CalendarFormat.ScheduleType {
    const isDefault = xmlScheduleType.isDefault[0] as string === 'true';
    const isStandard = xmlScheduleType.standard[0] === 'true';
    const id = xmlScheduleType.fullName[0];
    const name = (xmlScheduleType.displayName != null) ? xmlScheduleType.displayName[0] : id;
    const blocks: CalendarFormat.ScheduleBlock[] = [];
    for (let xmlBlock of xmlScheduleType.layout[0].block) {
        const type = xmlBlock.type[0];
        let block: CalendarFormat.ScheduleBlock;
        if (XmlTypes.isPeriodBlock(xmlBlock)) {
            ;
            block = { blockType: "PERIOD_BLOCK_TYPE", defaultPeriod: 0, startTime: parseTimeString(xmlBlock.startTime[0]), endTime: (moment(xmlBlock.endTime[0])) };
        } else if (XmlTypes.isLunchBlock(xmlBlock)) {
            console.warn("Unimplemented: Lunch Block")
            block = { blockType: "PERIOD_BLOCK_TYPE", defaultPeriod: 0, startTime: (null as moment.Moment), endTime: (null as moment.Moment) };
        } else if (XmlTypes.isStaticBlock(xmlBlock)) {
            block = { blockType: "STATIC_BLOCK_TYPE", defaultPeriod: 0, startTime: (null as moment.Moment), endTime: (null as moment.Moment), description: "foo" };
        } else {
            throw new Error("Unexpected Block Type");
        }

        blocks.push(block);
    }
    return { name: name, id: id, isDefault, isStandard, blocks: blocks };
}


/** Transforms 'default' tag to 'isDefault' so as to not conflict with keyword */
function fixDefaultTag(tagName: string): string {
    return tagName === 'default' ? 'isDefault' : tagName;
}

function parseTimeString(time: string): moment.Moment {
    return moment(time);
}


const parser = new ScheduleXmlParser('http://www.shadysideacademy.org/uploaded/SSA_Mobile/schedule2012.xml');
parser.getCalendar().then((res) => console.log(res));
