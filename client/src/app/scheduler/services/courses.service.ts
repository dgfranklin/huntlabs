/**
 * Created by dgfranklin on 10/4/16.
 */
import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { ScheduleResponse } from 'common/schedule';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CoursesService {
  constructor(private http: Http) {}

  createCourses(): Promise<ScheduleResponse> {
    return this.http.get('/api/courses').toPromise().then(response =>{
      return response.json() as ScheduleResponse;
    });
  }
}
