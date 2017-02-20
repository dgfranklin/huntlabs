import * as express from 'express'
import * as path from 'path';
import {ScheduleResponse} from './common/schedule';

export class ServerApp {

    private app: express.Express;
    
    constructor() {
        this.app = express();        
    }
    
    public setRoutes() {        
        this.app.use(express.static(path.join(__dirname, 'client')));
        this.app.get('/', this.renderIndex);          
        this.app.get('/api/courses', this.generateSchedule)
    }

    public startServer() {
        this.app.listen(8080, function () {
            console.log('HuntLabs server listening on port 8080!');
        });
    }

    /** Returns index.html in the body of the response*/
    private renderIndex(_: express.Request, res: express.Response) {
        res.sendFile(path.resolve(__dirname, 'client',' index.html'));
    }


    /** Generates a schedule from a course set and returns its id and the url of its corresponding webcal. */
    private generateSchedule(request: express.Request, res: express.Response) {
        const body: ScheduleResponse = {url: "foo.com/bar", scheduleId: 123};
        res.send(body);
    }
}
