import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login1Component } from './login-1/login-1.component';
import { SignUp1Component } from './sign-up-1/sign-up-1.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';

const routes: Routes = [
    {
        path: 'login-1',
        component: Login1Component,
        data: {
            title: 'Login 1'
        }
    },
    {
        path: 'sign-up-1',
        component: SignUp1Component,
        data: {
            title: 'Sign Up 1'
        }
    },
    { path: '', redirectTo: 'authentication/login-1', pathMatch: 'full' }, // Redirection vers login par défaut
    { path: '**', redirectTo: 'authentication/login-1' } ,// Redirection en cas de route non trouvée
    {
      path: 'forget-pass',
      component: ForgetPassComponent,
      data: {
          title: 'forget-pass'
      }
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
