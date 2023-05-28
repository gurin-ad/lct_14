import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateOfficeBlockComponent } from './private-office-block.component';

describe('PrivateOfficeBlockComponent', () => {
  let component: PrivateOfficeBlockComponent;
  let fixture: ComponentFixture<PrivateOfficeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateOfficeBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateOfficeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
