import {Component, OnInit, ViewChild} from '@angular/core';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Meeting} from '../../../models/meeting';
import {ListMeetingComponent} from '../list-meeting/list-meeting.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {

 @ViewChild(ListMeetingComponent) personID: number;

  meetings = this.meetingService.meetings;
  addingForm = this.formBuilder.group({
    notes: [null, Validators.compose([Validators.required])],
    followup: [null, Validators.compose([Validators.required])],
    goals: [null, Validators.compose([Validators.required])]
  });
  constructor(private meetingService: MeetingService, private formBuilder: FormBuilder , private route: ActivatedRoute) { }

  onSubmit(): void {
    const meeting: Meeting = {
      id: this.meetings.length,
      notes: this.addingForm.get('notes').value.toString(),
      followup: this.addingForm.get('followup').value.toString(),
      goals: this.addingForm.get('goals').value.toString(),
      idPerson: this.personID,
      idIntervenant: 0
      // Temporaire pendant que le login ne fonctionne pas. faut aller get la personne connectée
    };

    this.meetings.push(meeting);
    // redirection vers la liste
    console.log(this.meetings.length);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idx =	Number(params.get('id'));
      this.personID = idx;
    });
  }

}
