import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumns } from 'src/app/models/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent  {
  @Input() columns!: TableColumns[];
  @Input() data!: any[];
  @Input() action!: boolean;
  selectOptions = [
    { id: 1, entry: 10 },
    { id: 2, entry: 25 },
    { id: 3, entry: 50 },
    { id: 4, entry: 100 },
  ]
  label = this.selectOptions.map(option => option.entry)
  defaultOption = this.selectOptions[0].entry;
  selectedOption: any = this.defaultOption;
  perPage = 10;
  currentPage = 1;

  constructor(private router: Router) {}

  objectKeys(data: any[]) {
    return Object.keys(data);
  }
  
  onOptionSelect(value: number) {
    this.selectedOption = this.selectOptions.find(option => option.id === value);
    if (this.selectedOption) {
      this.perPage = this.selectedOption.entry;
      this.currentPage = 1; // Reset the current page to the first page when the number of entries per page changes
    }
  }
  getRangeStart(): number {
    return (this.currentPage - 1) * this.perPage + 1;
  }

  getRangeEnd(): number {
    return Math.min(this.currentPage * this.perPage, this.data.length);
  }

  getPageRange(): number[] {
    const pageCount = Math.ceil(this.data.length / this.perPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  getTotalPages(): number {
    return Math.ceil(this.data.length / this.perPage);
  }
  navigateToAddEdit(id: number) {
    const currentRoute = this.router.url;
    const routeParts = currentRoute.split('/');
    const context = routeParts[1]; // Assuming the context is the first part of the URL
    const addEditRoute = `/${context}/add-edit/${id}`;
    this.router.navigate([addEditRoute]);
  }
}
