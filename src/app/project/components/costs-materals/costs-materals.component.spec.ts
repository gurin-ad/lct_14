import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsMateralsComponent } from './costs-materals.component';

describe('CostsMateralsComponent', () => {
  let component: CostsMateralsComponent;
  let fixture: ComponentFixture<CostsMateralsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsMateralsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsMateralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
