import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalulationValueComponent } from './calulation-value.component';

describe('CalulationValueComponent', () => {
  let component: CalulationValueComponent;
  let fixture: ComponentFixture<CalulationValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalulationValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalulationValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
