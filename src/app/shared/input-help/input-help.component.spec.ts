import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputHelpComponent } from './input-help.component';

describe('InputHelpComponent', () => {
  let component: InputHelpComponent;
  let fixture: ComponentFixture<InputHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
