import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ListMeetingComponent} from '../list-meeting/list-meeting.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../../../services/person/person.service';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {UserService} from '../../../services/user/user.service';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Intervenant} from '../../../models/intervenant/intervenant';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit, OnDestroy {

 @ViewChild(ListMeetingComponent) personID: number;
  loggedUser = this.userService.user;  /*this.intervenantService.intervenants;*/
 // meetings = this.meetingService.meetings;
  errorsSubscription: Subscription;
  errorMessage: String;
  intervenantSubscription: Subscription;
  intervenants: Intervenant;

  addMeetingForm = this.formBuilder.group({
    notes: [null, Validators.compose([Validators.required])],
    followup: [null, Validators.compose([Validators.required])],
    goals: [null, Validators.compose([Validators.required])],
    idPerson: [null, Validators.compose([Validators.required])],
    idIntervenant: [null, Validators.compose([Validators.required])]
  });

  constructor(private router: Router, private userService: UserService, private intervenantService: IntervenantService, public personService: PersonService, private meetingService: MeetingService, private formBuilder: FormBuilder , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();

    this.intervenantService.getActiveIntervenants();
    this.intervenantSubscription = this.intervenantService.intervenantsSubject.subscribe(
      (inter: any) => {
        console.log(inter);
        this.intervenants = inter;
      }
    );

    this.errorsSubscription = this.meetingService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );
  }

  private initForm(): void {
    this.addMeetingForm = this.formBuilder.group({
      notes: [''/*, Validators.email*/],
      followup: [''/*, Validators.required*/],
      goals: [''/*, Validators.required*/],
      idPerson: [/*, Validators.required*/],
      idIntervenant: [/*, Validators.required*/]
    });
   /* const control = this.addMeetingForm.get('person');
    control.disable();*/
  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Ajouter"
  onAddMeeting(): void {
/*
    console.log('form ' + this.addMeetingForm.value.intervenant);
    this.meetingService.addMeeting(this.addMeetingForm.value)
      .subscribe(data => {console.log(data); });
    this.router.navigate(['meeting']);
*/

    if (this.addMeetingForm.valid) {
      this.meetingService.addMeeting(this.addMeetingForm.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }

  onSubmit(): void {

  }

  onCancelMeeting(): void {
    this.meetingService.cancelMeeting();
    this.intervenantSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

  ngOnDestroy(){
    this.intervenantSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }
}
