import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { ListIntervenantComponent } from './component/intervenant/list-intervenant/list-intervenant.component';
import { ListPersonComponent } from './component/person/list-person/list-person.component';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {PersonService} from './services/person/person.service';
import {RouterModule, Routes} from '@angular/router';
import { NotFoundComponent } from './component/error/not-found/not-found.component';
import {AuthGuard} from './services/authentification/auth-guard.service';
import { EditMeetingComponent } from './component/meeting/edit-meeting/edit-meeting.component';
import {DetailsPersonComponent} from './component/person/details-person/details-person.component';
import { MyAccountComponent } from './component/intervenant/my-account/my-account.component';
import { AddMeetingComponent } from './component/meeting/add-meeting/add-meeting.component';
import { AddPersonComponent } from './component/person/add-person/add-person.component';
import { EditPersonComponent } from './component/person/edit-person/edit-person.component';
import { AddIntervenantComponent } from './component/intervenant/add-intervenant/add-intervenant.component';
import { EditIntervenantComponent } from './component/intervenant/edit-intervenant/edit-intervenant.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PhonePipe } from './pipes/phone.pipe';
import { ConvertBooleanPipe } from './pipes/convert-boolean.pipe';
import {MatStepperModule} from '@angular/material/stepper';


import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { ConvertInterfaceNamePipe } from './pipes/convert-interface-name.pipe';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteIntervenantComponent } from './component/intervenant/delete-intervenant/delete-intervenant.component';
import {MatFormFieldControl, MatFormFieldModule, MatSuffix} from '@angular/material/form-field';
import { ConvertRoleNamePipe } from './pipes/convert-role-name.pipe';
import { DeletePersonComponent } from './component/person/delete-person/delete-person.component';

registerLocaleData(localeFr);

// Définition des routes

const appRoutes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'person', canActivate : [AuthGuard], component : ListPersonComponent},
  {path : 'person/add', canActivate : [AuthGuard], component : AddPersonComponent},
  {path : 'person/edit/:id', canActivate : [AuthGuard], component : EditPersonComponent},
  {path : 'person/details/:id', canActivate : [AuthGuard], component : DetailsPersonComponent},
  {path : 'intervenant', canActivate : [AuthGuard], component : ListIntervenantComponent},
  {path : 'intervenant/add', canActivate : [AuthGuard], component : AddIntervenantComponent},
  {path : 'intervenant/edit/:id', canActivate : [AuthGuard], component : EditIntervenantComponent},
  {path : 'meeting', canActivate : [AuthGuard], component : ListMeetingComponent},
  {path : 'meeting/add/:id', canActivate : [AuthGuard], component : AddMeetingComponent},
  {path : 'meeting/edit/:id', canActivate : [AuthGuard], component : EditMeetingComponent},
  {path : 'meeting/:id', canActivate : [AuthGuard], component : ListMeetingComponent},
  {path : 'account/:id', canActivate : [AuthGuard], component : MyAccountComponent},
  {path : '', component : LoginComponent},
  {path : 'not-found', component : NotFoundComponent},
  {path : '**', redirectTo : '/not-found'}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ListIntervenantComponent,
    DetailsPersonComponent,
    ListPersonComponent,
    ListMeetingComponent,
    ReportWeeklyComponent,
    ReportHoursWeeklyComponent,
    ReportNbrpeopleMonthComponent,
    ReportAnnualStatisticComponent,
    NotFoundComponent,
    EditMeetingComponent,
    MyAccountComponent,
    AddMeetingComponent,
    AddPersonComponent,
    EditPersonComponent,
    AddIntervenantComponent,
    EditIntervenantComponent,
    PhonePipe,
    ConvertBooleanPipe,
    ConvertInterfaceNamePipe,
    DeleteIntervenantComponent,
    ConvertRoleNamePipe,
    DeletePersonComponent,
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
    MatNativeDateModule,
    MatDatepickerModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    MatStepperModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    // On injecte services (N'est plus obligatoire dans la nouvelle version d'angular)
    PersonService,
    AuthGuard,
    [ {provide: LOCALE_ID, useValue: 'fr-CA' } ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
