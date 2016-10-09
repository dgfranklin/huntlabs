import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../services/courses.service';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  courses = Array.from(new Array(8).keys()).map((i) => i + 1);
  constructor(private courseService: CoursesService) {}

  ngOnInit() {}

  onSubmit() {
    console.log('on submit');
    this.courseService.createCourses().then(
      (response) => {
        console.log('response: ' + response.scheduleId);
      }, (error: any) => {
        console.log('error');
      }
    );
  }

}
