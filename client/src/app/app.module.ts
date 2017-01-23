import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HuntlabsRoutingModule} from './app-routing.module';
import { SchedulerModule } from './scheduler/scheduler.module'
import { AdminModule } from './admin/admin.module'

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),

    AdminModule,
    SchedulerModule,

    // This has to be loaded after modules with other routing or it will overwrite them.
    HuntlabsRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
