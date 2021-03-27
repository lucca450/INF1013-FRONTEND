import {Component, OnInit, ViewChild} from '@angular/core';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ListMeetingComponent} from '../list-meeting/list-meeting.component';
import {PersonService} from '../../../services/person/person.service';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {Meeting} from '../../../models/meeting/meeting';

@Component({
  selector: 'app-management-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.css']
})
export class EditMeetingComponent implements OnInit {

  @ViewChild(ListMeetingComponent) meetingID: number;
  meeting: Meeting;
  intervenants = this.intervenantService.intervenants;
  editMeetingForm = this.formBuilder.group({
    notes: [null, Validators.compose([Validators.required])],
    followup: [null, Validators.compose([Validators.required])],
    goals: [null, Validators.compose([Validators.required])],
    person: [null, Validators.compose([Validators.required])],
    intervenant: [null, Validators.compose([Validators.required])]
  });
  constructor(private intervenantService: IntervenantService, private personService: PersonService, private meetingService: MeetingService, private formBuilder: FormBuilder , private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idx =	Number(params.get('id'));
      this.meetingID = idx;
      this.initForm();
    });
  }

  private initForm(): void {
   // this.meeting = this.meetingService.getMeetingsFromID(this.meetingID);
    this.editMeetingForm = this.formBuilder.group({
      notes: [this.meeting.notes/*, Validators.email*/],
      followup: [this.meeting.followup/*, Validators.required*/],
      goals: [this.meeting.goals/*, Validators.required*/],
      person: [this.personService.personFullName(this.meeting.idPerson)/*, Validators.required*/],
      intervenant: [''/*, Validators.required*/]
    });

    const control = this.editMeetingForm.get('intervenant');
    control.setValue(this.meeting.idIntervenant, {onlySelf: true});
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Annuler"
  onCancelEditMeeting(): void {
    this.meetingService.cancelMeeting();
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Enregistrer"
  onEditMeeting(): void {
    this.meetingService.editMeeting();
  }
  onSubmit(): void {

  }

}
