import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsSalaryComponent } from './costs-salary.component';

describe('CostsSalaryComponent', () => {
  let component: CostsSalaryComponent;
  let fixture: ComponentFixture<CostsSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsSalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
