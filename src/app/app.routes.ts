import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthComponent} from "./auth/auth.component";
import {ShellHeaderComponent} from "./shell/shell-header/shell-header.component";
import {ShellSidebarComponent} from "./shell/shell-sidebar/shell-sidebar.component";
import {ShellComponent} from "./shell/shell.component";
import {Bpm000Component} from "./shell/modules/bpm/bpm000/bpm000.component";
import {KrnicpComponent} from "./shell/modules/krn/krnicp/krnicp.component";
import {AccountsComponent} from "./shell/modules/krn/accounts/accounts.component";
import {KrnHeaderComponent} from "./shell/modules/krn/krn-header/krn-header.component";
import {CreateComponent} from "./shell/modules/krn/accounts/create/create.component";
import {OperationsComponent} from "./shell/modules/krn/operations/operations.component";
import {Pmd311Component} from "./shell/modules/pmd/pmd311/pmd311.component";
import {Bpm001Component} from "./shell/modules/bpm/bpm001/bpm001.component";

export const routes: Routes = [ {
  path: 'auth',
  component: AuthComponent,
  children: [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]
},
  {
    path: 'krn',
    component: ShellComponent,
    children: [
      { path: 'krnicp', component: KrnHeaderComponent },
      {
        path: 'accounts',
        component: KrnHeaderComponent,
        children: [
          {
            path: '',
            component: AccountsComponent
          },
          {
            path: 'create',
            component: CreateComponent
          }
        ]
      },
      {
        path: 'operations',
        component: KrnHeaderComponent,
        children: [
          {
            path: '',
            component: OperationsComponent
          }
        ]
      }
    ]
  },

  {
    path: 'pmd',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: KrnHeaderComponent,
        children: [
          {
            path: 'pmd311',
            component: Pmd311Component
          }
          ]
      }
      ]
  },

  { path: 'bpm', component: ShellComponent,
  children: [ {
    path: 'bpm000',
    component: Bpm000Component
  },
    {
      path: 'bpm001',
      component: Bpm001Component
    }]},

  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Default to login
  { path: '**', redirectTo: '/auth' }, // Wildcard route for handling 404s
];
