import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAnnualStatisticComponent } from './report-annual-statistic.component';

describe('ReportAnnualStatisticComponent', () => {
  let component: ReportAnnualStatisticComponent;
  let fixture: ComponentFixture<ReportAnnualStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAnnualStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAnnualStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
