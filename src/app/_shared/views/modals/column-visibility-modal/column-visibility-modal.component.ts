import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-column-visibility-modal',
  templateUrl: './column-visibility-modal.component.html',
  styleUrls: ['./column-visibility-modal.component.css']
})
export class ColumnVisibilityModalComponent {
  selectedCol: string[] = [];
  allColumns: string[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ColumnVisibilityModalComponent>
  ) {
      this.allColumns = data.allColumns;
      console.log(this.allColumns);
      this.selectedCol = [...data.selectedColumns];
      console.log("columns after initallize: ", this.selectedCol);
  }

  toggleColumnSelection(col: string): void {
    const index = this.selectedCol.indexOf(col);
    if (index === -1) {
      // Column is not selected, add it to the selectedColumns array
      this.selectedCol.push(col);
    } else {
      // Column is already selected, remove it from the selectedColumns array
      this.selectedCol.splice(index, 1);
      console.log("all columns updated",this.allColumns);
      console.log("selected columns updated",this.selectedCol);
    }
  }
  

  isSelected(col: string): boolean {
    // Check if the column is present in the selectedColumns array
    return this.selectedCol.includes(col);
  }

  closeDialog(): void {
    // Pass the selectedColumns value back to the calling component
    this.dialogRef.close(this.selectedCol);
  }
}
