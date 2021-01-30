import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementIntervenantComponent } from './management-intervenant.component';

describe('ManagementIntervenantComponent', () => {
  let component: ManagementIntervenantComponent;
  let fixture: ComponentFixture<ManagementIntervenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementIntervenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
