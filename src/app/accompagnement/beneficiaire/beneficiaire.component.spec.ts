import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaireComponent } from './beneficiaire.component';

describe('BeneficiaireComponent', () => {
  let component: BeneficiaireComponent;
  let fixture: ComponentFixture<BeneficiaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficiaireComponent]
    });
    fixture = TestBed.createComponent(BeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
