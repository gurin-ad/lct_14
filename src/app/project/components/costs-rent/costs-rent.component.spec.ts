import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsRentComponent } from './costs-rent.component';

describe('CostsRentComponent', () => {
  let component: CostsRentComponent;
  let fixture: ComponentFixture<CostsRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
