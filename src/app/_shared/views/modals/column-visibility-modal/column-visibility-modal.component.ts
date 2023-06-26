import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColumnsLayout } from 'src/app/models/columnsLayout.model';
import { ApiClientService } from 'src/app/services/api-client.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-column-visibility-modal',
  templateUrl: './column-visibility-modal.component.html',
  styleUrls: ['./column-visibility-modal.component.css']
})
export class ColumnVisibilityModalComponent implements OnInit {
  selectedCol: string[] = [];
  allColumns: string[] = [];
  validationMessage = "At least three columns must be selected.";
  showValidation = false;
  isOpen = false;
  panelOpenState = false;
  hideToggle = true;
  expandedIndex = -1;
  layoutitle: string = '';
  defaultLayout: boolean = false;
  allSavedLayout: any = [];
  postLayout!: ColumnsLayout;
  selectedOption: any = ''
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackbarConfig = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: 3000,
  }
  applyLayoutButtonDisabled = true;
  // for toggle btn
  isChecked = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ColumnVisibilityModalComponent>,
    private apiClient: ApiClientService,
    private _snackBar: MatSnackBar
  ) {
    this.allColumns = data.allColumns;
    this.selectedCol = [...data.selectedColumns];
    this.postLayout = {
      title: '',
      defaultColumns: data.layout,
      defaultLayout: false
    }
  }

  ngOnInit(): void {
    this.loadLayoutData()
  }

  toggleColumnSelection(col: string): void {
    const index = this.selectedCol.indexOf(col);
    if (index === -1) {
      // Column is not selected, add it to the selectedColumns array
      this.selectedCol.push(col);
    } else {
      // Column is already selected, remove it from the selectedColumns array
      this.selectedCol.splice(index, 1);
    }
  }

  isSelected(col: string): boolean {
    // Check if the column is present in the selectedColumns array
    return this.selectedCol.includes(col);
  }

  generateLayout() {
    // Check if at least three columns are selected
    if (this.selectedCol.length < 3) {
      this.showValidation = true;
      return; // Prevent closing the dialog if fewer than three columns are selected
    }
    else {
      this.showValidation = false;
    }
    const title = "Layout has been generated.";
    const desc = "Your layout has been generated, you can save it for later use.";
    const icon = 'fa-solid fa-circle-check text-[#00A28E]';

    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        title: title,
        desc: desc,
        icon: icon
      },
      ...this.snackbarConfig,
    });
    this.applyLayoutButtonDisabled = false;
  }

  closeDialog(): void {
    // // Check if at least three columns are selected
    // if (this.selectedCol.length < 3) {
    //   this.showValidation = true;
    //   return; // Prevent closing the dialog if fewer than three columns are selected
    // }
    // else {
    //   this.showValidation = false;
    // }
    // Pass the selectedColumns value back to the calling component
    this.dialogRef.close({selectedCol: this.selectedCol});
  }

  toggleAccordion(index: number): void {
    this.isOpen = !this.isOpen;
    this.hideToggle = !this.hideToggle;
    if (this.expandedIndex === index) {
      // If the clicked item is already expanded, close it
      this.expandedIndex = -1;
    } else {
      // Otherwise, expand the clicked item and collapse the previously expanded item
      this.expandedIndex = index;
    }
  }

  loadLayoutData() {
    this.apiClient.getData('http://localhost:3000/columnslayout')
      .then(data => {
        this.allSavedLayout = data;
      })
      .catch(error => console.log(error))
  }

  saveColumnsLayout() {
    if (this.layoutitle.trim() === '') {
      const title = "Error";
      const desc = "Please fill in the layout title.";
      const icon = 'fa fa-times-circle text-[#FF5631]';
      this._snackBar.openFromComponent(SnackbarComponent, {
        ...this.snackbarConfig,
        data: {
          title: title,
          desc: desc,
          icon: icon,
        }
      });
      return;
    }
    // Check if the same title already exists
    const isTitleExists = this.allSavedLayout.some((layout: any) => layout.title === this.layoutitle);
    if (isTitleExists) {
      const title = "Error";
      const desc = "A layout with the same title already exists. Please choose a different title.";
      const icon = 'fa fa-times-circle text-[#FF5631]';
      this._snackBar.openFromComponent(SnackbarComponent, {
        ...this.snackbarConfig,
        data: {
          title: title,
          desc: desc,
          icon: icon,
        }
      });
      return;
    }

    this.postLayout.title = this.layoutitle;
    this.postLayout.defaultColumns = this.selectedCol;
    this.postLayout.defaultLayout = this.defaultLayout;
    this.allSavedLayout.push(this.postLayout);
    JSON.stringify(this.postLayout);
    this.apiClient.postData('http://localhost:3000/columnslayout', this.postLayout)
      .then(data => console.log("successfully posting data", data))
      .catch(error => console.log(error))
    const title = "Layout has been saved.";
    const desc = "Your layout has been saved, you can check it out in load layouts section.";
    const icon = 'fa-solid fa-circle-check text-[#00A28E]';
    this._snackBar.openFromComponent(SnackbarComponent, {
      ...this.snackbarConfig,
      data: {
        title: title,
        desc: desc,
        icon: icon,
      }
    });
  }

  loadColumnLayout() {
    this.dialogRef.close({selectedOption: this.selectedOption});
  }
}