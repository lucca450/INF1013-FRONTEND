import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveIntervenantComponent } from './reactive-intervenant.component';

describe('ReactiveIntervenantComponent', () => {
  let component: ReactiveIntervenantComponent;
  let fixture: ComponentFixture<ReactiveIntervenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveIntervenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
