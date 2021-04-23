import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonMeetingsComponent } from './list-person-meetings.component';

describe('ListPersonMeetingsComponent', () => {
  let component: ListPersonMeetingsComponent;
  let fixture: ComponentFixture<ListPersonMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPersonMeetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersonMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
