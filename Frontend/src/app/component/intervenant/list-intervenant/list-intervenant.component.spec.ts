import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIntervenantComponent } from './list-intervenant.component';

describe('ListIntervenantComponent', () => {
  let component: ListIntervenantComponent;
  let fixture: ComponentFixture<ListIntervenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIntervenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
