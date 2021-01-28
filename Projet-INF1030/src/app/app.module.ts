import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { AddIntervenantComponent } from './component/intervenant/add-intervenant/add-intervenant.component';
import { EditIntervenantComponent } from './component/intervenant/edit-intervenant/edit-intervenant.component';
import { ListIntervenantComponent } from './component/intervenant/list-intervenant/list-intervenant.component';
import { AddPersonComponent } from './component/person/add-person/add-person.component';
import { EditPersonComponent } from './component/person/edit-person/edit-person.component';
import { DetailsPersonComponent } from './component/person/details-person/details-person.component';
import { ListPersonComponent } from './component/person/list-person/list-person.component';
import { AddMeetingComponent } from './component/meeting/add-meeting/add-meeting.component';
import { EditMeetingComponent } from './component/meeting/edit-meeting/edit-meeting.component';
import { ListMeetingComponent } from './component/meeting/list-meeting/list-meeting.component';
import { ReportWeeklyComponent } from './component/admin/report-weekly/report-weekly.component';
import { ReportHoursWeeklyComponent } from './component/admin/report-hours-weekly/report-hours-weekly.component';
import { ReportNbrpeopleMonthComponent } from './component/admin/report-nbrpeople-month/report-nbrpeople-month.component';
import { ReportAnnualStatisticComponent } from './component/admin/report-annual-statistic/report-annual-statistic.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AddIntervenantComponent,
    EditIntervenantComponent,
    ListIntervenantComponent,
    AddPersonComponent,
    EditPersonComponent,
    DetailsPersonComponent,
    ListPersonComponent,
    AddMeetingComponent,
    EditMeetingComponent,
    ListMeetingComponent,
    ReportWeeklyComponent,
    ReportHoursWeeklyComponent,
    ReportNbrpeopleMonthComponent,
    ReportAnnualStatisticComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
