import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthComponent} from "./auth/auth.component";

export const routes: Routes = [ {
  path: 'auth',
  component: AuthComponent,
  children: [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]
},
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Default to login
  { path: '**', redirectTo: '/auth' } // Wildcard route for handling 404s
];
