
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtudeService } from 'src/app/services/etude.service';
import { Etude } from 'src/app/classe/etude'; 
import { AuthService } from 'src/app/authentication/serv/auth.service';// Assure-toi que le chemin est correct

@Component({
  selector: 'app-etude',
  templateUrl: './etude.component.html',
  styleUrls: ['./etude.component.css']
})
export class EtudeComponent implements OnInit {
  etudes: Etude[] = [];
  etudeForm: FormGroup;
  isModalOpen = false;
  isSuccessMessageVisible = false;
  successMessage = '';
  editEtude: Etude | null = null;
  searchKeyword = '';
  itemsPerPage = 5;
  p = 1; // Page actuelle
  userData: any; // Déclaration pour stocker les données de l'utilisateur

  constructor(
    private etudeService: EtudeService, 
    private fb: FormBuilder, 
    private authService: AuthService // Injection de AuthService
  ) {
    this.etudeForm = this.fb.group({
      anneeScolaire: ['', Validators.required],
      niveau: ['', Validators.required],
      institut: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEtudes();
    this.loadUserData(); // Charger les données de l'utilisateur lors de l'initialisation
  }

  loadEtudes(): void {
    this.etudeService.getAllEtudes().subscribe(
      (etudes) => {
        this.etudes = etudes;
      },
      (error) => {
        console.error('Error loading etudes', error);
      }
    );
  }

  searchEtudes(): void {
    if (this.searchKeyword) {
      this.etudeService.searchEtudes(this.searchKeyword).subscribe(
        (etudes) => {
          this.etudes = etudes;
        },
        (error) => {
          console.error('Error searching etudes', error);
        }
      );
    } else {
      this.loadEtudes(); // Si le champ de recherche est vide, rechargez toutes les études
    }
  }

  openModal(etude?: Etude): void {
    if (etude) {
      this.editEtude = etude;
      this.etudeForm.patchValue(etude);
    } else {
      this.editEtude = null;
      this.etudeForm.reset();
    }
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  createEtude(): void {
    if (this.etudeForm.valid) {
      const etude: Etude = this.etudeForm.value;
      if (this.editEtude) {
        this.etudeService.updateEtude(this.editEtude.id!, etude).subscribe(
          (updatedEtude) => {
            this.showSuccessMessage('Etude updated successfully!');
            this.loadEtudes();
            this.closeModal();
          },
          (error) => {
            console.error('Error updating etude', error);
          }
        );
      } else {
        this.etudeService.createEtude(etude).subscribe(
          (newEtude) => {
            this.showSuccessMessage('Etude created successfully!');
            this.loadEtudes();
            this.closeModal();
          },
          (error) => {
            console.error('Error creating etude', error);
          }
        );
      }
    }
  }

  editEtudeDetails(etude: Etude): void {
    this.openModal(etude);
  }

  deleteEtude(id: number): void {
    if (confirm('Are you sure you want to delete this etude?')) {
      this.etudeService.deleteEtude(id).subscribe(
        () => {
          this.showSuccessMessage('Etude deleted successfully!');
          this.loadEtudes();
        },
        (error) => {
          console.error('Error deleting etude', error);
        }
      );
    }
  }

  viewDetails(id: number): void {
    this.etudeService.getEtudeById(id).subscribe(
      (etude) => {
        // Handle etude details (e.g., open a modal with details)
        console.log(etude);
      },
      (error) => {
        console.error('Error fetching etude details', error);
      }
    );
  }

  loadUserData(): void {
    this.authService.getUserData().subscribe(
      data => {
        this.userData = data;
        console.log("this.userData (stringified): " + JSON.stringify(data)); 
      },
      error => {
        console.error('Error fetching user data', error);
        this.authService.logout();
      }
    );
  }



  private showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.isSuccessMessageVisible = true;
    setTimeout(() => {
      this.isSuccessMessageVisible = false;
    }, 3000); // Hide the success message after 3 seconds
  }
}




// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { EtudeService } from 'src/app/services/etude.service';
// import { Etude } from 'src/app/classe/etude'; 
// @Component({
//   selector: 'app-etude',
//   templateUrl: './etude.component.html',
//   styleUrls: ['./etude.component.css']
// })
// export class EtudeComponent implements OnInit {
//   etudes: Etude[] = [];
//   etudeForm: FormGroup;
//   isModalOpen = false;
//   isSuccessMessageVisible = false;
//   successMessage = '';
//   editEtude: Etude | null = null;
//   searchKeyword = '';
//   itemsPerPage = 5;
//   p = 1; // Page actuelle

//   constructor(private etudeService: EtudeService, private fb: FormBuilder) {
//     this.etudeForm = this.fb.group({
//       anneeScolaire: ['', Validators.required],
//       niveau: ['', Validators.required],
//       institut: ['', Validators.required],
//       note: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.loadEtudes();
//   }

//   loadEtudes(): void {
//     this.etudeService.getAllEtudes().subscribe(
//       (etudes) => {
//         this.etudes = etudes;
//       },
//       (error) => {
//         console.error('Error loading etudes', error);
//       }
//     );
//   }

//   searchEtudes(): void {
//     if (this.searchKeyword) {
//       this.etudeService.searchEtudes(this.searchKeyword).subscribe(
//         (etudes) => {
//           this.etudes = etudes;
//         },
//         (error) => {
//           console.error('Error searching etudes', error);
//         }
//       );
//     } else {
//       this.loadEtudes(); // Si le champ de recherche est vide, rechargez toutes les études
//     }
//   }
  
 

//   openModal(etude?: Etude): void {
//     if (etude) {
//       this.editEtude = etude;
//       this.etudeForm.patchValue(etude);
//     } else {
//       this.editEtude = null;
//       this.etudeForm.reset();
//     }
//     this.isModalOpen = true;
//   }

//   closeModal(): void {
//     this.isModalOpen = false;
//   }

//   createEtude(): void {
//     if (this.etudeForm.valid) {
//       const etude: Etude = this.etudeForm.value;
//       if (this.editEtude) {
//         this.etudeService.updateEtude(this.editEtude.id!, etude).subscribe(
//           (updatedEtude) => {
//             this.successMessage = 'Etude updated successfully!';
//             this.isSuccessMessageVisible = true;
//             this.loadEtudes();
//             this.closeModal();
//           },
//           (error) => {
//             console.error('Error updating etude', error);
//           }
//         );
//       } else {
//         this.etudeService.createEtude(etude).subscribe(
//           (newEtude) => {
//             this.successMessage = 'Etude created successfully!';
//             this.isSuccessMessageVisible = true;
//             this.loadEtudes();

//             this.closeModal();
//           },
//           (error) => {
//             console.error('Error creating etude', error);
//           }
//         );
//       }
//     }
//   }

//   editEtudeDetails(etude: Etude): void {
//     this.openModal(etude);
//   }

//   deleteEtude(id: number): void {
//     if (confirm('Are you sure you want to delete this etude?')) {
//       this.etudeService.deleteEtude(id).subscribe(
//         () => {
//           this.successMessage = 'Etude deleted successfully!';
//           this.isSuccessMessageVisible = true;
//           this.loadEtudes();
//         },
//         (error) => {
//           console.error('Error deleting etude', error);
//         }
//       );
//     }
//   }

//   viewDetails(id: number): void {
//     this.etudeService.getEtudeById(id).subscribe(
//       (etude) => {
//         // Handle etude details (e.g., open a modal with details)
//         console.log(etude);
//       },
//       (error) => {
//         console.error('Error fetching etude details', error);
//       }
//     );
//   }
//   loadUserData(): void {
//     this.authService.getUserData().subscribe(
//       data => {
//         this.userData = data;
//         console.log("this.userData (stringified): " + JSON.stringify(data)); 
//       },
//       error => {
//         console.error('Error fetching user data', error);
//         this.authService.logout();
//       }
//       );
//       }



  
 
// }
