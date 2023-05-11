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
    { id: 1, entry: 10 },
    { id: 2, entry: 25 },
    { id: 3, entry: 50 },
    { id: 4, entry: 100 },
  ]
  label = this.selectOptions.map(option => option.entry)
  defaultOption = this.selectOptions[0].id;
  objectKeys(data: any[]) {
    return Object.keys(data);
  }
}
