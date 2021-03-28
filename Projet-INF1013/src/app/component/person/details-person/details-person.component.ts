import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PersonService} from '../../../services/person/person.service';
import {Person} from '../../../models/person/person';
import {Intervenant} from '../../../models/intervenant/intervenant';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Gender} from '../../../enum/gender.enum';
import {WorkCityService} from '../../../services/workCity/work-city.service';
import {DepartureReasonService} from '../../../services/departureReason/departure-reason.service';
import {StatusService} from '../../../services/status/status.service';
import {EducationLevelService} from '../../../services/educationLevel/education-level.service';
import {ResidenceTypeService} from '../../../services/residenceType/residence-type.service';
import {ReferenceService} from '../../../services/reference/reference.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-details-person',
  templateUrl: './details-person.component.html',
  styleUrls: ['./details-person.component.css']
})
export class DetailsPersonComponent implements OnInit, OnDestroy {

  errorMessage: String;
  person: Person;
  isSlideChecked = false;
  //Énumération
  gender = Object.keys(Gender).map(key => Gender[key]);
  // Récupération des services
  cities = this.workCityService;
  status = this.statusService;
  departureReason = this.departureReasonService;
  residenceType =this.residenceTypeService;
  educationLevel = this.educationLevelService;
  reference = this.referenceService;
  intervenant = this.intervenantService;

  errorsSubscription: Subscription;
  personSubscription: Subscription;

  constructor(private personService: PersonService ,
              private intervenantService: IntervenantService,
              private departureReasonService: DepartureReasonService,
              private statusService: StatusService,
              private workCityService: WorkCityService,
              private residenceTypeService: ResidenceTypeService,
              private referenceService: ReferenceService,
              private educationLevelService: EducationLevelService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.errorsSubscription = this.personService.errorsSubject.subscribe(
        (error: any) => {
          this.errorMessage = error;
        }
      )
      const id =	Number(params.get('id'));

      this.personService.getPersonFromId(id);

      this.personSubscription = this.personService.personSubject.subscribe(
        (person: any) => {
          this.person = person;
        },
        (error: any) => {
          this.errorMessage = error;
        }
      )
    });
  }

  // Fonction pour gèrer le slider du NAS.
  toggleChanges($event: MatSlideToggleChange):  void {
    this.isSlideChecked = $event.checked;
  }

  ngOnDestroy(): void {
    this.errorsSubscription.unsubscribe();
    this.personSubscription.unsubscribe();
  }
}

