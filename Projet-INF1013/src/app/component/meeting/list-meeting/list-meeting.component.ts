import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MeetingService} from '../../../services/meeting/meeting.service';
import {ActivatedRoute} from '@angular/router';
import {Meeting} from '../../../models/meeting/meeting';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.css']
})
export class ListMeetingComponent implements OnInit, AfterViewInit {


  @ViewChild(MatSort) sort: MatSort;
  @Input() personID: number;

  // dataSource: MatTableDataSource<Meeting>;
  meetings = new MatTableDataSource(this.meetingService.meetings);
  meetingSubscription: Subscription;

  displayedColumns: string[] = [ 'notes', 'followup', 'goals', 'actions-icon'];
  constructor(private meetingService: MeetingService , private route: ActivatedRoute) { }

  ngOnInit(): void {
    /*this.route.paramMap.subscribe(params => {
      const idx =	Number(params.get('id'));
      this.personID = idx;
      this.meetings = new MatTableDataSource(this.meetingService.meetings.filter(meeting => meeting.idPerson === this.personID));
    });*/

   /* this.meetingSubscription = this.meetingService.meetingsSubject.subscribe(
      (meet: any) => {
        this.meetings = meet;
      }
    );*/

    this.meetingService.getAllMeetings()
      .subscribe( (meet: any) => {
        console.log('updated');
        this.meetings = meet;
      });



    // Nous permet de définir sur quels attributs la recherche va se faire.
    // tslint:disable-next-line:only-arrow-functions
    this./*dataSource*/meetings.filterPredicate = function(data, filter: string): boolean {
      return data.notes.toLowerCase().includes(filter) ||
        data.followup.toLowerCase().includes(filter) ||
        data.goals.toString().includes(filter);
    };
  }




  ngAfterViewInit(): void {
    this./*dataSource*/meetings.sort = this.sort;
  }
  // Fonction qui permet d'appliquer le filtre sur toute les colonnes du tableau selon ce que l'utilisateur à écris.
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this./*dataSource*/meetings.filter = filterValue.trim().toLowerCase();
  }

}
