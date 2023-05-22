import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion'
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { HeaderComponent } from './_shared/views/header/header.component';
import { SidebarComponent } from './_shared/views/sidebar/sidebar.component';
import { FooterComponent } from './_shared/views/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { IndexHeaderComponent } from './_shared/views/index-header/index-header.component';
import { CompanyManagementComponent } from './views/company/company-management/company-management.component';
import { TableComponent } from './_shared/views/table/table.component';
import { SelectComponent } from './_shared/views/select/select.component';
import { AddEditComponent } from './views/company/add-edit/add-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    IndexHeaderComponent,
    CompanyManagementComponent,
    TableComponent,
    SelectComponent,
    AddEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
