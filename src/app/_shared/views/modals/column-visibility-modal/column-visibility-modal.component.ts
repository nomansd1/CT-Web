import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-column-visibility-modal',
  templateUrl: './column-visibility-modal.component.html',
  styleUrls: ['./column-visibility-modal.component.css']
})
export class ColumnVisibilityModalComponent {
  
  selectedColumns: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.selectedColumns);
  }

  toggleColumnSelection(col: string): void {
    const index = this.selectedColumns.indexOf(col);
    if (index === -1) {
      this.selectedColumns.push(col);
    console.log(this.selectedColumns);
    } else {
      this.selectedColumns.splice(index, 1);
    }
  }
  
  isSelected(col: string): boolean {
    return this.selectedColumns.includes(col);
  }
  
}
