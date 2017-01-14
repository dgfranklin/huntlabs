import * as express from 'express'
import * as path from 'path';

export class ServerApp {

    private app: express.Express;
    
    constructor() {
        this.app = express();        
    }
    
    public setRoutes() {        
        this.app.use(express.static(path.join(__dirname, 'client')));
        this.app.get('/', this.renderIndex);          
    }

    public startServer() {
        this.app.listen(5000, function () {
            console.log('HuntLabs server listening on port 5000!');
        });
    }

    /** Add a method to render index.html on path '/' */
    private renderIndex(req: express.Request, res: express.Response) {
        res.sendFile(path.resolve(__dirname, 'client',' index.html'));
    }
}
