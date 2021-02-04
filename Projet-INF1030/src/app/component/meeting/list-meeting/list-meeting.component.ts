import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MeetingService} from '../../../services/meeting/meeting.service';

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.css']
})
export class ListMeetingComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource(this.meetingService.meetings);
  displayedColumns: string[] = ['notes', 'followup', 'goals', 'actions-icon'];
  constructor(private meetingService: MeetingService) { }

  ngOnInit(): void {
    // tslint:disable-next-line:only-arrow-functions
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.notes.toLowerCase().includes(filter) ||
        data.followup.toLowerCase().includes(filter) ||
        data.goals.toString().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
