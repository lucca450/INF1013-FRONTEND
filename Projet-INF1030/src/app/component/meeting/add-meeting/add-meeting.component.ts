import { Component, OnInit } from '@angular/core';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Meeting} from '../../../models/meeting';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {

  meetings = this.meetingService.meetings;
  addingForm = this.formBuilder.group({
    notes: [null, Validators.compose([Validators.required])],
    followup: [null, Validators.compose([Validators.required])],
    goals: [null, Validators.compose([Validators.required])]
  });
  constructor(private meetingService: MeetingService, private formBuilder: FormBuilder) { }

  onSubmit(): void {
    const meeting: Meeting = {
      id: this.meetings.length,
      notes: this.addingForm.get('notes').value.toString(),
      followup: this.addingForm.get('followup').value.toString(),
      goals: this.addingForm.get('goals').value.toString()
    };
    this.meetings.push(meeting);
    // redirection vers la liste
  }

  ngOnInit(): void {
  }

}
