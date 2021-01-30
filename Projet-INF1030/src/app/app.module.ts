import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSortModule} from "@angular/material/sort";
import {PersonService} from './services/person.service.';
import {RouterModule, Routes} from '@angular/router';
import { NotFoundComponent } from './component/error/not-found/not-found.component';


// Définition des routes de base

const appRoutes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'person', component : ListPersonComponent},
  {path : '', component : LoginComponent},
  {path : 'not-found', component : NotFoundComponent},
  {path : '**', redirectTo : '/not-found'}
]


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
    ReportAnnualStatisticComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSortModule,
    RouterModule.forRoot(appRoutes) // On injecte les routes
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
