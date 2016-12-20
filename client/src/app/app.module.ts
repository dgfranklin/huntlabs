import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import {CoursesService} from './services/courses.service';
import { AppComponent } from './app.component';
import {EditorComponent} from './editor/editor.component';
import {EditorCourseComponent} from './editor/editor-course/editor-course.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    EditorCourseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
