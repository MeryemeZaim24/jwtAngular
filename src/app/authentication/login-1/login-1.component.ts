import { Component } from '@angular/core'
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import  socialIcons  from './../../../assets/data/pages/social-items.json';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../serv/auth.service';


@Component({
    templateUrl: './login-1.component.html'
})

export class Login1Component {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = socialIcons.socialMediaButtons;

  validateForm!: UntypedFormGroup;

  authRequest = {
    mail: '',
    pwd: ''
  };

  constructor(private fb: FormBuilder, private router: Router, private location: Location, private authService: AuthService) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const { userName, password } = this.validateForm.value;
      this.authRequest.mail = userName; 
      this.authRequest.pwd = password;
      this.authService.login(this.authRequest).subscribe(response => {
        console.log('Login successful', response);
        localStorage.setItem('token', response);
        console.log('submit', this.validateForm.value);
        this.router.navigate(['/dashboard/demo-one']).then(() => {
             window.location.reload();
         });
      }, error => {
        console.error('Login error', error);
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  passwordVisible = false;
  password?: string;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['admin3@gmail.com', [Validators.required]],
      password: ['admin', [Validators.required]],
      remember: [true],
    });
  }
  // signOut():void {
  //   this.authService.logout
  // }
}

























