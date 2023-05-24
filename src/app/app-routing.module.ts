import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.service'

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { CompanyManagementComponent } from './views/company/company-management/company-management.component';
import { AddEditComponent as CompanyManagementAddEdit } from './views/company/add-edit/add-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'company', component: CompanyManagementComponent, canActivate: [AuthGuard] },
  { path: 'company/add-edit/:id', component: CompanyManagementAddEdit, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
