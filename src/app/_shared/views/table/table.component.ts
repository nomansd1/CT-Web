import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() columns!: any[];
  @Input() data!: any[];
  @Input() action!: boolean;
  selectOptions = [
    { id: 1, entries: 10 },
    { id: 2, entries: 25 },
    { id: 3, entries: 50 },
    { id: 4, entries: 100 },
  ]
  lebel = this.selectOptions.entries
  defaultOption = this.selectOptions[0].id;

  objectKeys(data: any[]) {
    return Object.keys(data);
  }
}
