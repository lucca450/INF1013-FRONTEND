import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHoursWeeklyComponent } from './report-hours-weekly.component';

describe('ReportHoursWeeklyComponent', () => {
  let component: ReportHoursWeeklyComponent;
  let fixture: ComponentFixture<ReportHoursWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportHoursWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportHoursWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
