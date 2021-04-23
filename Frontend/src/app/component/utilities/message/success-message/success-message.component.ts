import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SuccessMessageComponent implements OnInit {

  constructor(private snackBarRef: MatSnackBarRef<SuccessMessageComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }
  public dismiss(): void {
    this.snackBarRef.dismiss();
    event.preventDefault();
  }

}
