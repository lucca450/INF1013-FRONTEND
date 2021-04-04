import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListMeetingComponent} from '../list-meeting/list-meeting.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../../../services/person/person.service';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {UserService} from '../../../services/user/user.service';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Intervenant} from '../../../models/intervenant/intervenant';
import {User} from '../../../models/users/user';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit, OnDestroy {

 @ViewChild(ListMeetingComponent) personID: number;
  loggedUser = this.userService.user;
  errorsSubscription: Subscription;
  errorMessage: string;
  intervenantSubscription: Subscription;
  intervenants: User;
  personsSubscription: Subscription;
  persons: Intervenant;
  addMeetingForm: FormGroup;
  /*addMeetingForm = this.formBuilder.group({
    notes: [null, Validators.compose([Validators.required])],
    followup: [null, Validators.compose([Validators.required])],
    goals: [null, Validators.compose([Validators.required])],
    idPerson: [null, Validators.compose([Validators.required])],
    idIntervenant: [null, Validators.compose([Validators.required])]
  });*/
  constructor(private router: Router, private userService: UserService, private personService: PersonService,
              private intervenantService: IntervenantService, private meetingService: MeetingService, private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.initForm();

  /*  this.intervenantService.getActiveIntervenants();
    this.intervenantSubscription = this.intervenantService.intervenantsSubject.subscribe(
      (inter: any) => {
        console.log(inter);
        this.intervenants = inter;
      }
    );*/

    if (this.loggedUser.role === 'A') {
      this.intervenantService.getActiveIntervenants();
      this.intervenantSubscription = this.intervenantService.intervenantsSubject.subscribe(
        (inter: any) => {
          console.log(inter);
          this.intervenants = inter;
        }
      );
    }else {
      this.intervenantService.intervenantFullName(this.loggedUser.id);
      this.intervenantSubscription = this.intervenantService.intervenantsFullnameSubject.subscribe(
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
    this.addMeetingForm = this.formBuilder.group({
      notes: ['', [Validators.required , Validators.minLength(5), Validators.maxLength(4000)]],
      followup: ['', [Validators.required , Validators.minLength(5), Validators.maxLength(4000)]],
      goals: ['', [Validators.required , Validators.minLength(5), Validators.maxLength(4000)]],
      idPerson: ['', Validators.required],
      idIntervenant: ['', Validators.required]
    });
   /* const control = this.addMeetingForm.get('person');
    control.disable();*/
  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Ajouter"
  onAddMeeting(): void {
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
    this.personsSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

  ngOnDestroy(): void{
    this.intervenantSubscription.unsubscribe();
    this.personsSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }
}
