import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListMeetingComponent} from '../list-meeting/list-meeting.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../../../services/person/person.service';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {UserService} from '../../../services/user/user.service';
import {Subscription} from 'rxjs';
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
  errorMessage: string;
  intervenants: User;
  persons: Intervenant;
  addMeetingForm: FormGroup;
  intervenantFullName: string;
  // Subscription
  personsSubscription: Subscription;
  intervenantSubscription: Subscription;
  errorsSubscription: Subscription;
  person: number;

  constructor(private router: Router, private userService: UserService, private personService: PersonService, private route: ActivatedRoute,
              private intervenantService: IntervenantService, private meetingService: MeetingService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const idx =	Number(params.get('id'));
      this.person = idx;
    });

    // Initialisation du formulaire
    this.initForm();

    // Si l'utilisateur est un administrateur
    if (this.loggedUser.role === 'A') {
      // Appel de la requête pour récupérer tout les intervenants actifs.
      this.intervenantService.getActiveIntervenants();
      this.intervenantSubscription = this.intervenantService.intervenantsSubject.subscribe(
        (inter: any) => {
          this.intervenants = inter;
        }
      );
    }else {
      // On appel la méthode qui fait la requête pour récupérer le nom complet de l'utilisateur connecté.
      this.intervenantService.intervenantFullName(this.loggedUser.id);
      // On écoute la réponse de cette requête pour le nom complet.
      this.intervenantSubscription = this.intervenantService.intervenantsFullnameSubject.subscribe(
        (fullName: any) => {
          this.intervenantFullName = fullName;
        }
      );
    }

    // Appel la méthode qui fiat la requête pour récupèrer toute les personnes actifs.
    this.personService.getActivePersons();
    // On écoute la requête pour récupèrer les personnes.
    this.personsSubscription = this.personService.personsSubject.subscribe(
      (person: any) => {
        this.persons = person;
      }
    );
    // On écoute les requêtes pour voir s'il y a des erreurs.
    this.errorsSubscription = this.meetingService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );
  }
  // Initialisation du formulaire
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
    // On vérifie si le formulaire ne contient pas d'erreur.
    if (this.addMeetingForm.valid) {
      this.meetingService.addMeeting(this.addMeetingForm.value, this.person);
    }else {
      alert('Les champs en surbrillance contiennent des données incorrectes, veuillez les corriger.');
    }
  }
 // Fonction pour réagir lorsque la personne clique sur le bouton "Annuler"
  onCancelMeeting(): void {
    this.meetingService.cancelMeeting();
    this.unsubscribe();
  }

  ngOnDestroy(): void{
    this.unsubscribe();
  }
  private unsubscribe(): void{
    this.intervenantSubscription.unsubscribe();
    this.personsSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

}
