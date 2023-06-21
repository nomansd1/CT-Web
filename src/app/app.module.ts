import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion'
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

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
import { NavbarComponent } from './_shared/views/navbar/navbar.component';
import { ColumnVisibilityModalComponent } from './_shared/views/modals/column-visibility-modal/column-visibility-modal.component';
import { UploadFileModalComponent } from './_shared/views/modals/upload-file-modal/upload-file-modal.component';
import { ColumnsLayoutModalComponent } from './_shared/views/modals/columns-layout-modal/columns-layout-modal.component';
import{HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
    NavbarComponent,
    ColumnVisibilityModalComponent,
    UploadFileModalComponent,
    ColumnsLayoutModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    FormsModule,
    NgSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
