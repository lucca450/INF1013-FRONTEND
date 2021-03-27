import {AfterViewInit, Component, Input, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Meeting} from '../../../models/meeting/meeting';
import {Subscription} from 'rxjs';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteIntervenantComponent} from '../../intervenant/delete-intervenant/delete-intervenant.component';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.css']
})
export class ListMeetingComponent implements OnInit, AfterViewInit {


  @ViewChild(MatSort) sort: MatSort;
  @Input() personID: number;
  loggedUser = this.userService.user;
  meetings = new MatTableDataSource(this.meetingService.meetings);
  meetingSubscription: Subscription;
  errorsSubscription: Subscription;
  errorMessage: any;
  displayedColumns: string[] = [ 'notes', 'followup', 'goals', 'actions-icon'];
  // dataSource: MatTableDataSource<Meeting>;



  constructor(private meetingService: MeetingService , private route: ActivatedRoute, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {

    console.log('onINIT');
    this.meetingService.loadAllMeetings();

    this.meetingSubscription = this.meetingService.meetingSubject.subscribe(
      (meet: any) => {
        this.meetings = new MatTableDataSource(meet);;
      }
    );

    this.errorsSubscription = this.meetingService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );

/*
    if (this.loggedUser.role === 'A'){
      this.meetingService.getAllMeetings()
        .subscribe( (meet: any) => {
          this.meetings = meet;
        });
    }else{
      this.meetingService.getMeetingsFromID(this.loggedUser.id)
        .subscribe( (meet: any) => {
          this.meetings = meet;
        });

    }
*/




    // Nous permet de définir sur quels attributs la recherche va se faire.
    // tslint:disable-next-line:only-arrow-functions
    this.meetings.filterPredicate = function(data, filter: string): boolean {
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
