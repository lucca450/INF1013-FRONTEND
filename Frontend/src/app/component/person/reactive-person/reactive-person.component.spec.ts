import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivePersonComponent } from './reactive-person.component';

describe('ReactivePersonComponent', () => {
  let component: ReactivePersonComponent;
  let fixture: ComponentFixture<ReactivePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactivePersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
