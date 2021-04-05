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
import {User} from '../../../models/users/user';


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
  errorMessage: string;
  intervenants: User;
  persons: Intervenant;
  editMeetingForm = this.formBuilder.group({
    notes: [null, Validators.compose([Validators.required])],
    followup: [null, Validators.compose([Validators.required])],
    goals: [null, Validators.compose([Validators.required])],
    idPerson: [null, Validators.compose([Validators.required])],
    idIntervenant: [null, Validators.compose([Validators.required])]
  });
  // Subscription
  errorsSubscription: Subscription;
  meetingSubscription: Subscription;
  intervenantSubscription: Subscription;
  personsSubscription: Subscription;

  constructor(private intervenantService: IntervenantService, private userService: UserService, public personService: PersonService,
              private meetingService: MeetingService, private formBuilder: FormBuilder , private route: ActivatedRoute) {
  }

   ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idx =	Number(params.get('id'));
      this.meetingID = idx;
    });

    // On appel la méthode qui fait la requête pour récupèrer les informations de la recnontre.
    this.meetingService.getMeetingFromId(this.meetingID);
    // On écoute la requête pour récupèrer les informations de la rencontre.
    this.meetingSubscription = this.meetingService.meetingSubject.subscribe(
      (meet: any) => {
        this.meeting = meet[0];
        this.initForm();
      }, (error: any) => {
         this.errorMessage = error;
      }
    );
    // Si l'utilisateur est un administrateur
    if (this.loggedUser.role === 'A') {
      // On appel la méthode qui récupère tout les intervenants actifs.
      this.intervenantService.getActiveIntervenants();
      // On récupère les intervenants que la requête nous envoies.
      this.intervenantSubscription = this.intervenantService.intervenantsSubject.subscribe(
        (inter: any) => {
          this.intervenants = inter;
        }
      );
    }else {
      // On appel la méthode qui éffectue une requête pour récupèrer l'identifiant de l'intervenant à partir de son identifiant.
      this.intervenantService.getIntervenantFromId(this.loggedUser.id);
      // On récupère les informations de la requête.
      this.intervenantSubscription = this.intervenantService.intervenantSubject.subscribe(
        (inter: any) => {
          this.intervenants = inter;
        }
      );
    }
    // Appel de la méthode qui fait la requête pour récupérer les personnes actives.
    this.personService.getActivePersons();
    // On récuère les informations de la requête
    this.personsSubscription = this.personService.personsSubject.subscribe(
       (person: any) => {
         this.persons = person;
       }
     );
    // On écoute les requêtes pour voir s'il y a des erreurs. S'il y'en a on les affiches.
    this.errorsSubscription = this.meetingService.errorsSubject.subscribe(
        (error: any) => {
          this.errorMessage = error;
        }
      );

  }
  // Initialisation du formulaire.
  private initForm(): void {
    this.editMeetingForm = this.formBuilder.group({
      notes: [this.meeting.notes, [Validators.required, Validators.minLength(5), Validators.maxLength(4000)]],
      followup: [this.meeting.followup, [Validators.required, Validators.minLength(5), Validators.maxLength(4000)]],
      goals: [this.meeting.goals, [Validators.required, Validators.minLength(5), Validators.maxLength(4000)]],
      idPerson: [this.meeting.idPerson, Validators.required],
      idIntervenant: [this.meeting.idIntervenant, Validators.required],
      id: [this.meeting.id]
    });
  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Enregistrer"
  onEditMeeting(): void {
    if (this.editMeetingForm.valid) {
      this.meetingService.editMeeting(this.editMeetingForm.value);
      this.unsubscribe();
    }else {
      alert('Les champs en surbrillance contiennent des données incorrectes, veuillez les corriger.');
    }
  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Annuler"
  onCancelEditMeeting(): void {
    this.meetingService.cancelMeeting();
    this.unsubscribe();
  }

  ngOnDestroy(): void{
    this.unsubscribe();
  }
  private unsubscribe(): void{
    this.meetingSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
    this.intervenantSubscription.unsubscribe();
    this.personsSubscription.unsubscribe();
  }
}
