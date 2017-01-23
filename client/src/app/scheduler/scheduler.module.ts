import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { EditorComponent } from './editor/editor.component';
import { EditorCourseComponent } from './editor-course/editor-course.component';

@NgModule({
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [SchedulerComponent, EditorComponent, EditorCourseComponent]
})
export class SchedulerModule { }
