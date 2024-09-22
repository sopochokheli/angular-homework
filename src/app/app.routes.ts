import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthComponent} from "./auth/auth.component";
import {ShellHeaderComponent} from "./shell/shell-header/shell-header.component";
import {ShellSidebarComponent} from "./shell/shell-sidebar/shell-sidebar.component";
import {ShellComponent} from "./shell/shell.component";
import {Bpm000Component} from "./shell/modules/bpm/bpm000/bpm000.component";

export const routes: Routes = [ {
  path: 'auth',
  component: AuthComponent,
  children: [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]
},
  {
    path: 'home',
    component: ShellComponent,
    children: [
      { path: '', component: Bpm000Component}
    ]
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Default to login
  { path: '**', redirectTo: '/auth' }, // Wildcard route for handling 404s
];
