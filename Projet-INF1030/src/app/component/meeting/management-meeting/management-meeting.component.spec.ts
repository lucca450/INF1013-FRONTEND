import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementMeetingComponent } from './management-meeting.component';

describe('ManagementMeetingComponent', () => {
  let component: ManagementMeetingComponent;
  let fixture: ComponentFixture<ManagementMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
