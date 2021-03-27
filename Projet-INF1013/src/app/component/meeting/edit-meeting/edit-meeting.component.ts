import {Component, OnInit, ViewChild} from '@angular/core';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ListMeetingComponent} from '../list-meeting/list-meeting.component';
import {PersonService} from '../../../services/person/person.service';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {Meeting} from '../../../models/meeting/meeting';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-management-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.css']
})
export class EditMeetingComponent implements OnInit {

  @ViewChild(ListMeetingComponent) meetingID: number;
  meeting: Meeting;
  intervenants = this.intervenantService.intervenants;
  loggedUser = this.userService.user;
  errorsSubscription: Subscription;
  errorMessage: string;

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
      this.meeting =  this.meetingService.getMeetingFromId(idx);

      console.log(this.meeting.id + ' ' + this.meeting.notes);

      this.initForm();

      this.errorsSubscription = this.meetingService.errorsSubject.subscribe(
        (error: any) => {
          this.errorMessage = error;
        }
      );
    });
  }

  private initForm(): void {
   // this.meeting = this.meetingService.getMeetingsFromID(this.meetingID);
    this.editMeetingForm = this.formBuilder.group({
      notes: [this.meeting.notes/*, Validators.email*/],
      followup: [this.meeting.followup/*, Validators.required*/],
      goals: [this.meeting.goals/*, Validators.required*/],
      idPerson: [this.meeting.idPerson/*, Validators.required*/],
      idIntervenant: [this.meeting.idIntervenant /*, Validators.required*/],
      id: [this.meetingID]
    });

   /* const control = this.editMeetingForm.get('intervenant');
    control.setValue(this.meeting.idIntervenant, {onlySelf: true});*/
  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Enregistrer"
  onEditMeeting(): void {
    if (this.editMeetingForm.valid) {
      console.log(this.editMeetingForm.value);
      this.meetingService.editMeeting(this.editMeetingForm.value);

    }else {
      alert('Veuillez remplir tous les champs');
    }
  }

  onSubmit(): void {
  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Annuler"
  onCancelEditMeeting(): void {
    this.meetingService.cancelMeeting();
    this.errorsSubscription.unsubscribe();
  }
}
