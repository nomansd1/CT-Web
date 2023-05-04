import { Component } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent {
  tableCol:string[] = []
  constructor(private apiClient: ApiClientService) {}

  ngOnInit(): void {
    this.apiClient.getData('http://localhost:2000/columns').then(data => {
      this.tableCol = data
      console.log(this.tableCol);
      
    }).catch(error => console.log(error)) 
  }
}
