import {AfterViewInit, Component, Input, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Meeting} from '../../../models/meeting/meeting';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.css']
})
export class ListMeetingComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild(MatSort) sort: MatSort;
  @Input() personID: number;
  loggedUser = this.userService.user;
  meetings = new MatTableDataSource(/*this.meetingService.meetings*/);
  meetingSubscription: Subscription;
  errorsSubscription: Subscription;
  errorMessage: any;
  displayedColumns: string[] = [ 'notes', 'followup', 'goals', 'actions-icon'];

  constructor(private meetingService: MeetingService , private route: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit(): void {
    // Appel de la méthode qui fait la requête pour charger toute les rencontres
    this.meetingService.loadAllMeetings();

    // On écoute la requête
    this.meetingSubscription = this.meetingService.meetingSubject.subscribe(
      (meet: any) => {
        this.meetings = new MatTableDataSource(meet);
      }
    );
    // Vérifie s'il y à une erreur en fesant une requête.
    this.errorsSubscription = this.meetingService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );
    // Nous permet de définir sur quels attributs la recherche va se faire.
    this.meetings.filterPredicate = (data: Meeting, filter: string): boolean => data.notes.toLowerCase().includes(filter) ||
      data.followup.toLowerCase().includes(filter) ||
      data.goals.toString().includes(filter);
  }

  ngAfterViewInit(): void {
    this.meetings.sort = this.sort;
  }

  // Fonction qui permet d'appliquer le filtre sur toute les colonnes du tableau selon ce que l'utilisateur à écris.
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.meetings.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
    this.meetingSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

}
