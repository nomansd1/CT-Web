import { Component } from '@angular/core';
import { TableColumns } from 'src/app/models/table.model';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent {
  tableColumns: TableColumns[] = []
  tableData: any[] = []
  showAction = true;
  filteredTableData: any[] = [];

  constructor(private apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.apiClient.getData('http://localhost:3000/tableData').then(data => {
      this.tableColumns = data.columns;
      this.tableData = data.data;
    }).catch(error => console.log(error))
  }
  onSearch(searchValue: string) {
    // Filter the table data based on the search value
    if (searchValue) {
      this.filteredTableData = this.tableData.filter((item) =>
        // Perform your filtering logic here
        // For example, check if the item contains the search value in any of its properties
        Object.values(item).some((value: any) =>
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    } else {
      this.filteredTableData = this.tableData;
    }
  }

}
