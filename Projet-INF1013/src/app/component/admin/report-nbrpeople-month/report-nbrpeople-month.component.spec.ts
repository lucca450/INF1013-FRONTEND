import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNbrpeopleMonthComponent } from './report-nbrpeople-month.component';

describe('ReportNbrpeopleMonthComponent', () => {
  let component: ReportNbrpeopleMonthComponent;
  let fixture: ComponentFixture<ReportNbrpeopleMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportNbrpeopleMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNbrpeopleMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
