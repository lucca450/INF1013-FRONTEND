import {Component, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-details-person',
  templateUrl: './details-person.component.html',
  styleUrls: ['./details-person.component.css']
})
export class DetailsPersonComponent implements OnInit {

  personID: number;
  person: Person;
  cities = this.workCityService;
  gender = Object.keys(Gender).map(key => Gender[key]);
  isSlideChecked = false;
  status = this.statusService;
  departureReason = this.departureReasonService;
  residenceType =this.residenceTypeService;
  educationLevel = this.educationLevelService;
  reference = this.referenceService;


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
      const idx =	Number(params.get('id'));
      this.personID = idx;
      const persons = this.personService.persons.filter(p => p.id === this.personID);
      this.person = persons[0];
    });
  }

  getIntervenantFromID( myID: number): Intervenant {
    const returnOBJ = this.intervenantService.intervenants.filter(p => p.id === myID);
    return returnOBJ[0];
  }

  toggleChanges($event: MatSlideToggleChange):  void {
    this.isSlideChecked = $event.checked;
  }
}

