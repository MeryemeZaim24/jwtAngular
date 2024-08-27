import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Beneficiaire } from 'src/app/classe/beneficiaire';
import { BeneficiaireService } from 'src/app/services/beneficiaire.service';


@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
  styleUrls: ['./beneficiaire.component.css']
})
export class BeneficiaireComponent implements OnInit {
  beneficiaires: Beneficiaire[] = [];
  selectedBeneficiaire: Beneficiaire | null = null;
  beneficiaireForm: FormGroup;
  isEditing = false;

  constructor(private beneficiaireService: BeneficiaireService, private fb: FormBuilder) {
    this.beneficiaireForm = this.fb.group({
      id: [null],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      pereContact: [''],
      mereContact: [''],
      region: ['', Validators.required],
      branche: [null],
      ville: [null]
    });
  }

  ngOnInit(): void {
    this.loadBeneficiaires();
  }

  loadBeneficiaires(): void {
    this.beneficiaireService.getAllBeneficiaires().subscribe(
      (data: Beneficiaire[]) => this.beneficiaires = data,
      (error) => console.error(error)
    );
  }

  selectBeneficiaire(beneficiaire: Beneficiaire): void {
    this.selectedBeneficiaire = beneficiaire;
    this.beneficiaireForm.patchValue(beneficiaire);
    this.isEditing = true;
  }

  createOrUpdateBeneficiaire(): void {
    if (this.beneficiaireForm.valid) {
      const beneficiaire: Beneficiaire = this.beneficiaireForm.value;
      if (beneficiaire.id) {
        this.beneficiaireService.updateBeneficiaire(beneficiaire.id, beneficiaire).subscribe(
          () => {
            this.loadBeneficiaires();
            this.resetForm();
          },
          (error) => console.error(error)
        );
      } else {
        this.beneficiaireService.createBeneficiaire(beneficiaire).subscribe(
          () => {
            this.loadBeneficiaires();
            this.resetForm();
          },
          (error) => console.error(error)
        );
      }
    }
  }

  deleteBeneficiaire(id: number): void {
    if (confirm('Are you sure you want to delete this beneficiaire?')) {
      this.beneficiaireService.deleteBeneficiaire(id).subscribe(
        () => this.loadBeneficiaires(),
        (error) => console.error(error)
      );
    }
  }

  resetForm(): void {
    this.beneficiaireForm.reset();
    this.isEditing = false;
    this.selectedBeneficiaire = null;
  }
}
