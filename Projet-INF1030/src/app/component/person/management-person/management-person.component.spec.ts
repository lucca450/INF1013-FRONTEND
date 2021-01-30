import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPersonComponent } from './management-person.component';

describe('ManagementPersonComponent', () => {
  let component: ManagementPersonComponent;
  let fixture: ComponentFixture<ManagementPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
