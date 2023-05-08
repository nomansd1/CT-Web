import { Component } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent {
  tableColumns = []
  tableData = []
  constructor(private apiClient: ApiClientService) {}

  ngOnInit(): void {
    this.apiClient.getData('http://localhost:3000/tableData').then(data => {
      this.tableColumns = data.columns;
      this.tableData = data.data; 
    }).catch(error => console.log(error)) 
  }
}
