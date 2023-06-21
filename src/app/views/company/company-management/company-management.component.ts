import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumns } from 'src/app/models/table.model';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent {
  @Output() searchQuery = '';
  
  tableColumns: string[] = []
  tableData: any[] = []
  showAction = true;
  show=false;
  filteredTableData: any[] = [];

  constructor(
    private apiClient: ApiClientService, 
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
    this.getdata()
  }
  getdata()
  {
    this.apiClient.getData('http://localhost:3000/tableData').then(data => {
      this.show = true;
      this.tableColumns = data.columns;
      this.tableData = data.data;
    }).catch(error => console.log(error))
  }
  onSearchChange(value: string) {
    this.searchQuery = value;
  }
  
  navigateToAddEdit() {
    const currentRoute = this.router.url;
    const routeParts = currentRoute.split('/');
    const context = routeParts[1]; // Assuming the context is the first part of the URL
    const addEditRoute = `/${context}/add-edit`;
    this.router.navigate([addEditRoute]);
  }

}
