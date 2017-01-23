import { Component, OnInit, Input } from '@angular/core';
import {Course, CourseKind, CourseLunchBlock} from "../models/course";

export class KindOption {
  name: string;
  value: CourseKind
}

export class CourseLunchBlockOption {
  name: string;
  value: CourseLunchBlock;
}

@Component({
  selector: 'hunt-editor-course',
  templateUrl: './editor-course.component.html',
  styleUrls: ['./editor-course.component.scss']
})
export class EditorCourseComponent implements OnInit {
  @Input() dayNumber: number;
  model: Course = new Course(this.dayNumber, "", CourseKind.Normal, CourseLunchBlock.AB);

  ngOnInit() {
  }

  kindOptions: KindOption[] = [{name: 'Normal', value:CourseKind.Normal}, {name: 'Science', value:CourseKind.Science}];
  lunchBlockOptions: CourseLunchBlockOption[] = [{name: 'A&B', value:CourseLunchBlock.AB}, {name: 'B&C', value:CourseLunchBlock.BC}];
}
