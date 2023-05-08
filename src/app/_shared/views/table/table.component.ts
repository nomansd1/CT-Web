import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() columns!: any[];
  @Input() data!: any[];

  objectKeys(data: any[]) {
    return Object.keys(data);
  }
}
