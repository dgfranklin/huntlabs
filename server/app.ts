/**
 * Created by dgfranklin on 10/2/16.
 */
import * as express from 'express';
import * as path from 'path';
import {ScheduleResponse} from '../shared/schedule';

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

interface Potato {
  url: string;
  schedule: number;
};

app.get('/api/courses', (req, res) => {
  const schedule:ScheduleResponse = {url: 'http:/foo', scheduleId: 123};
  res.send(JSON.stringify(schedule));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});