import {Component, Input, OnInit} from '@angular/core';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {ActivatedRoute} from '@angular/router';
import {PersonService} from '../../../services/person/person.service';
import {MatTableDataSource} from '@angular/material/table';
import {Person} from '../../../models/person';
import {Intervenant} from '../../../models/intervenant';
import {EmergencyContact} from '../../../models/emergency-contact';
import {OtherPerson} from '../../../models/other-person';
import {Doctor} from '../../../models/doctor';
import {getClassName} from 'codelyzer/util/utils';
import {City} from '../../../enum/city';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';



@Component({
  selector: 'app-details-person',
  templateUrl: './details-person.component.html',
  styleUrls: ['./details-person.component.css']
})
export class DetailsPersonComponent implements OnInit {

  personID: number;
  person: Person;
  cities = Object.keys(City).map(key => City[key]);

  constructor(private personService: PersonService , private intervenantService: IntervenantService, private route: ActivatedRoute) { }

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

}

