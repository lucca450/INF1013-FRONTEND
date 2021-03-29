import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Meeting} from '../../../models/meeting/meeting';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {PersonService} from '../../../services/person/person.service';

@Component({
  selector: 'app-list-person-meetings',
  templateUrl: './list-person-meetings.component.html',
  styleUrls: ['./list-person-meetings.component.css']
})
export class ListPersonMeetingsComponent implements OnInit, OnDestroy {


  @ViewChild(MatSort) sort: MatSort;
  loggedUser = this.userService.user;
  personID: number;
  meetings = new MatTableDataSource();
  meetingSubscription: Subscription;
  errorsSubscription: Subscription;
  errorMessage: any;
  displayedColumns: string[] = [ 'notes', 'followup', 'goals', 'actions-icon'];

  constructor(private meetingService: MeetingService, private personService: PersonService, private route: ActivatedRoute, private userService: UserService) {

  }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const idx =	Number(params.get('id'));
      this.personID = idx;
      console.log(idx);
    });


    this.meetingService.loadPersonMeetings(this.personID);

    this.meetingSubscription = this.meetingService.PersonMeetingsSubject.subscribe(
      (meet: any) => {
        this.meetings = new MatTableDataSource(meet);
      }
    );

    this.errorsSubscription = this.meetingService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );

    // Nous permet de définir sur quels attributs la recherche va se faire.
    // tslint:disable-next-line:only-arrow-functions
    this.meetings.filterPredicate = function(data: Meeting, filter: string): boolean {
      return data.notes.toLowerCase().includes(filter) ||
        data.followup.toLowerCase().includes(filter) ||
        data.goals.toString().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.meetings.sort = this.sort;
  }

  // Fonction qui permet d'appliquer le filtre sur toute les colonnes du tableau selon ce que l'utilisateur à écris.
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.meetings.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.meetingSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

}
