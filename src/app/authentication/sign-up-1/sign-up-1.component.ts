import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import  socialIcons  from './../../../assets/data/pages/social-items.json';

import { Router } from '@angular/router';
import { AuthService } from '../serv/auth.service';


@Component({
    templateUrl: './sign-up-1.component.html'
})

export class SignUp1Component {
    socialMediaButtons = socialIcons.socialMediaButtons;
    signUpForm: FormGroup;
    isLoading = false;
    error = false;
    submitForm(): void {
        if (this.signUpForm.valid) {
          const formValue = this.signUpForm.value;
    
          // Ensure the emails and passwords match
          if (formValue.email !== formValue.confirmEmail) {
            alert('Emails do not match');
            return;
          }
    
          if (formValue.password !== formValue.confirmPassword) {
            alert('Passwords do not match');
            return;
          }
    
          const user = {
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            mail: formValue.email,
            pwd: formValue.password,
            type: 'User', // default user type
            stockage: '0' // default stockage value
          };
    
          this.authService.register(user).subscribe(
            response => {
              console.log(response);
              alert('User successfully added');
              this.router.navigate(['/authentication/login-1']);
            },
            error => {
              console.error(error);
              alert('An error occurred while adding the user');
            }
          );
        } else {
          alert('Please fill in all required fields');
        }
      }

    updateConfirmValidator(): void {
        Promise.resolve().then(() => this.signUpForm.controls.checkPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.signUpForm.controls.password.value) {
            return { confirm: true, error: true };
        }
    }

    constructor( private router: Router,private fb: FormBuilder,private authService:AuthService) {
    }

    passwordVisible = false;
    password?: string;
    ngOnInit(): void {
        this.signUpForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            confirmEmail: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            agree: [false, Validators.requiredTrue],
            
          });
    }
}























// import { Component, OnInit } from '@angular/core'
// // import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
// import  socialIcons  from './../../../assets/data/pages/social-items.json';
// import { AuthService } from '../serv/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { Router } from '@angular/router';


// @Component({
//     templateUrl: './sign-up-1.component.html'
// })

// export class SignUp1Component implements OnInit{
//     user = {
//         firstName: '',
//         lastName: '',
//         mail: '',
//         pwd: ''
//       };
//       errorMessage: string | null = null;
//       registerForm: FormGroup;
    
//       constructor(private authService: AuthService, private router: Router,private fb: FormBuilder) {}
//       ngOnInit(): void {
//         this.registerForm = this.fb.group({
//           firstName: ['', Validators.required],
//           lastName: ['', Validators.required],
//           mail: ['', [Validators.required, Validators.email]],
//           pwd: ['', [Validators.required, Validators.minLength(6)]]
//         });
//       }
    
//       register() {
//         this.authService.register(this.user).subscribe(
//           (response) => {
//             alert(response);
//             this.router.navigate(['/authentication/login-1']);
//           },
//           (error) => {
//             this.errorMessage = 'Registration failed';
//           }
//         );
//       }
//        onSubmit(): void {
//     if (this.registerForm.valid) {
//       const formData = this.registerForm.value;
//       console.log('Registration successful with data:', formData);
//       // Call your registration service here
//     } else {
//       console.log('Form is invalid');
//     }
//   }
//     }
























//     socialMediaButtons = socialIcons.socialMediaButtons;
//     signUpForm: FormGroup;
//     isLoading = false;
//     error = false;
//     submitForm(): void {
//         for (const i in this.signUpForm.controls) {
//             this.signUpForm.controls[ i ].markAsDirty();
//             this.signUpForm.controls[ i ].updateValueAndValidity();
//         }
//     }

//     updateConfirmValidator(): void {
//         Promise.resolve().then(() => this.signUpForm.controls.checkPassword.updateValueAndValidity());
//     }

//     confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
//         if (!control.value) {
//             return { required: true };
//         } else if (control.value !== this.signUpForm.controls.password.value) {
//             return { confirm: true, error: true };
//         }
//     }

//     constructor(private fb: FormBuilder) {
//     }

//     passwordVisible = false;
//     password?: string;
//     ngOnInit(): void {
//         this.signUpForm = this.fb.group({
//             name         : [ null, [ Validators.required ] ],
//             userName         : [ null, [ Validators.required ] ],
//             email            : [ null, [ Validators.required ] ],
//             password         : [ null, [ Validators.required ] ],
//             checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
//             agree            : [ false ]
//         });
//     }
// }
