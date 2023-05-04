import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion'
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './_shared/views/header/header.component';
import { SidebarComponent } from './_shared/views/sidebar/sidebar.component';
import { FooterComponent } from './_shared/views/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BusinesspartnerComponent } from './components/businesspartner/businesspartner.component';
import { IndexHeaderComponent } from './_shared/views/index/index-header/index-header.component';
import { CompanyManagementComponent } from './views/company/company-management/company-management.component';
import { TableComponent } from './_shared/views/table/table.component';
import { IndexBodyComponent } from './_shared/views/index/index-body/index-body.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    BusinesspartnerComponent,
    IndexHeaderComponent,
    CompanyManagementComponent,
    TableComponent,
    IndexBodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
