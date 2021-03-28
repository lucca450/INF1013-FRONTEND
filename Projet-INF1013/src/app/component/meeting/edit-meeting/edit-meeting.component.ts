import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ListMeetingComponent} from '../list-meeting/list-meeting.component';
import {PersonService} from '../../../services/person/person.service';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {Meeting} from '../../../models/meeting/meeting';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user/user.service';
import {Intervenant} from '../../../models/intervenant/intervenant';


@Component({
  selector: 'app-management-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.css']
})
export class EditMeetingComponent implements OnInit, OnDestroy {

  @ViewChild(ListMeetingComponent) meetingID: number;
  meeting: Meeting;
 // intervenants = this.intervenantService.intervenants;
  loggedUser = this.userService.user;
  errorsSubscription: Subscription;
  meetingSubscription: Subscription;
  errorMessage: string;
  intervenantSubscription: Subscription;
  intervenants: Intervenant;
  personsSubscription: Subscription;
  persons: Intervenant;
  editMeetingForm = this.formBuilder.group({
    notes: [null, Validators.compose([Validators.required])],
    followup: [null, Validators.compose([Validators.required])],
    goals: [null, Validators.compose([Validators.required])],
    idPerson: [null, Validators.compose([Validators.required])],
    idIntervenant: [null, Validators.compose([Validators.required])]
  });

  constructor(private intervenantService: IntervenantService, private userService: UserService, public personService: PersonService, private meetingService: MeetingService, private formBuilder: FormBuilder , private route: ActivatedRoute) {
  }

   ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idx =	Number(params.get('id'));
      this.meetingID = idx;
      console.log(idx);
    });

    this.meetingService.getMeetingFromId(this.meetingID);


    this.meetingSubscription = this.meetingService.meetingSubject.subscribe(
      (meet: any) => {
        this.meeting = meet[0];
        this.initForm();
      }, (error: any) => {
         this.errorMessage = error;
      }
    );

    if (this.loggedUser.role === 'A') {
      this.intervenantService.getActiveIntervenants();
      this.intervenantSubscription = this.intervenantService.intervenantsSubject.subscribe(
        (inter: any) => {
          console.log(inter);
          this.intervenants = inter;
        }
      );
    }else {
      this.intervenantService.getIntervenantFromId(this.loggedUser.id);
      this.intervenantSubscription = this.intervenantService.intervenantsSubject.subscribe(
        (inter: any) => {
          console.log(inter);
          this.intervenants = inter;
        }
      );
    }

    this.personService.getActivePersons();
    this.personsSubscription = this.personService.personsSubject.subscribe(
       (person: any) => {
         console.log(person);
         this.persons = person;
       }
     );

    this.errorsSubscription = this.meetingService.errorsSubject.subscribe(
        (error: any) => {
          this.errorMessage = error;
        }
      );

  }

  private initForm(): void {
    // this.meeting = this.meetingService.getMeetingsFromID(this.meetingID);
    this.editMeetingForm = this.formBuilder.group({
      notes: [this.meeting.notes, [Validators.required, Validators.minLength(5), Validators.maxLength(4000)]],
      followup: [this.meeting.followup, [Validators.required, Validators.minLength(5), Validators.maxLength(4000)]],
      goals: [this.meeting.goals, [Validators.required, Validators.minLength(5), Validators.maxLength(4000)]],
      idPerson: [this.meeting.idPerson, Validators.required],
      idIntervenant: [this.meeting.idIntervenant, Validators.required],
      id: [this.meeting.id]
    });

   /* const control = this.editMeetingForm.get('intervenant');
    control.setValue(this.meeting.idIntervenant, {onlySelf: true});*/
  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Enregistrer"
  onEditMeeting(): void {
    if (this.editMeetingForm.valid) {
      console.log(this.editMeetingForm.value);
      this.meetingService.editMeeting(this.editMeetingForm.value);
      this.meetingSubscription.unsubscribe();
      this.errorsSubscription.unsubscribe();
      this.intervenantSubscription.unsubscribe();
      this.personsSubscription.unsubscribe();
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }

  onSubmit(): void {
  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Annuler"
  onCancelEditMeeting(): void {
    this.meetingService.cancelMeeting();
    this.meetingSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
    this.intervenantSubscription.unsubscribe();
    this.personsSubscription.unsubscribe();
  }

  ngOnDestroy(){
  this.meetingSubscription.unsubscribe();
  this.errorsSubscription.unsubscribe();
  this.intervenantSubscription.unsubscribe();
  this.personsSubscription.unsubscribe();
  }
}
