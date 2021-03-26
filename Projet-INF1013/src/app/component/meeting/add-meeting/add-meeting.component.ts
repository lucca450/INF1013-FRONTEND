import {Component, OnInit, ViewChild} from '@angular/core';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ListMeetingComponent} from '../list-meeting/list-meeting.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../../../services/person/person.service';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {

 @ViewChild(ListMeetingComponent) personID: number;
  loggedUser = this.userService.user;  /*this.intervenantService.intervenants;*/
  meetings = this.meetingService.meetings;
  addMeetingForm = this.formBuilder.group({
    notes: [null, Validators.compose([Validators.required])],
    followup: [null, Validators.compose([Validators.required])],
    goals: [null, Validators.compose([Validators.required])],
    person: [null, Validators.compose([Validators.required])],
    intervenant: [null, Validators.compose([Validators.required])]
  });
  constructor(private router: Router, private userService: UserService, private intervenantService: IntervenantService, private personService: PersonService, private meetingService: MeetingService, private formBuilder: FormBuilder , private route: ActivatedRoute) { }

  ngOnInit(): void {
   /* this.route.paramMap.subscribe(params => {
      const idx =	Number(params.get('id'));
      this.personID = idx;

     this.intervenants.push(this.intervenantService.getIntervenantFromID(idx));
      this.initForm();
    });
    */
  }

  private initForm(): void {
    this.addMeetingForm = this.formBuilder.group({
      notes: [''/*, Validators.email*/],
      followup: [''/*, Validators.required*/],
      goals: [''/*, Validators.required*/],
      person: [this.personService.personFullName(this.personID)/*, Validators.required*/],
      intervenant: [/*, Validators.required*/]
    });
    const control = this.addMeetingForm.get('person');
    control.disable();
  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Ajouter"
  onAddMeeting(): void {
    // this.meetingService.addMeeting();
    console.log('form ' + this.addMeetingForm.value.intervenant);
    this.meetingService.addMeeting(this.addMeetingForm.value)
      .subscribe(data => {console.log(data); });
    this.router.navigate(['meeting']);
  }

  onSubmit(): void {

  }

  onCancelMeeting(): void {
    this.meetingService.cancelMeeting();
  }
}
