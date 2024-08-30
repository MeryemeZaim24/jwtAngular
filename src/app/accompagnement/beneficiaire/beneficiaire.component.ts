import { Component, OnInit } from '@angular/core';
import { BeneficiaireService } from 'src/app/services/beneficiaire.service';
import { Beneficiaire } from 'src/app/classe/beneficiaire';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
  styleUrls: ['./beneficiaire.component.css']
})
export class BeneficiaireComponent implements OnInit {
  beneficiaires: Beneficiaire[] = [];
  beneficiaireForm: FormGroup;
  selectedBeneficiaire: Beneficiaire | null = null;
  showFilter = false; // Ajoutez cette propriété pour le filtre
  filters = { nom: '', prenom: '', branche: '' };
  branches = []; // Initialisez avec les données appropriées
  datatableConfig: any; // Configurez vos paramètres de DataTable ici
  isLoading = false;
  swalOptions: any = {}; // Configurez vos options SweetAlert ici

  constructor(
    private beneficiaireService: BeneficiaireService,
    private fb: FormBuilder
  ) {
    this.beneficiaireForm = this.fb.group({
      id: [null],
      nom: [''],
      prenom: [''],
      dateNaissance: [''],
      branche: [null]
    });
  }

  ngOnInit(): void {
    this.loadBeneficiaires();
  }

  loadBeneficiaires(): void {
    this.beneficiaireService.getAllBeneficiaires(this.datatableConfig).subscribe(
      (response) => {
        this.beneficiaires = response.data;
      },
      (error) => {
        console.error('Erreur lors du chargement des bénéficiaires', error);
      }
    );
  }

  saveBeneficiaire(): void {
    const beneficiaire: Beneficiaire = this.beneficiaireForm.value;
    if (beneficiaire.id) {
      this.beneficiaireService.updateBeneficiaire(beneficiaire.id, beneficiaire).subscribe(
        () => {
          this.loadBeneficiaires();
          this.clearForm();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du bénéficiaire', error);
        }
      );
    } else {
      this.beneficiaireService.createBeneficiaire(beneficiaire).subscribe(
        () => {
          this.loadBeneficiaires();
          this.clearForm();
        },
        (error) => {
          console.error('Erreur lors de la création du bénéficiaire', error);
        }
      );
    }
  }

  deleteBeneficiaire(id: number): void {
    this.beneficiaireService.deleteBeneficiaire(id).subscribe(
      () => {
        this.loadBeneficiaires();
      },
      (error) => {
        console.error('Erreur lors de la suppression du bénéficiaire', error);
      }
    );
  }

  editBeneficiaire(beneficiaire: Beneficiaire): void {
    this.beneficiaireForm.patchValue(beneficiaire);
  }

  openCreateModal(): void {
    this.beneficiaireForm.reset();
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  clearForm(): void {
    this.beneficiaireForm.reset();
    this.selectedBeneficiaire = null;
  }

  filterBeneficiaires(): void {
    this.beneficiaireService.getFilteredBeneficiaires(this.filters).subscribe(
      (response) => {
        this.beneficiaires = response.data;
      },
      (error) => {
        console.error('Erreur lors du filtrage des bénéficiaires', error);
      }
    );
  }
}
