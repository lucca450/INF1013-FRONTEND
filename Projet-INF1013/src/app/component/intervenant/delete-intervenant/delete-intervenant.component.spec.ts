import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIntervenantComponent } from './delete-intervenant.component';

describe('DeleteIntervenantComponent', () => {
  let component: DeleteIntervenantComponent;
  let fixture: ComponentFixture<DeleteIntervenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteIntervenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
