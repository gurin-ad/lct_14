import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtyComponent } from './realty.component';

describe('RealtyComponent', () => {
  let component: RealtyComponent;
  let fixture: ComponentFixture<RealtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealtyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
