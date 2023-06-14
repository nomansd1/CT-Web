import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColumnsLayout } from 'src/app/models/columnsLayout.model';
import { ApiClientService } from 'src/app/services/api-client.service';


@Component({
  selector: 'app-columns-layout-modal',
  templateUrl: './columns-layout-modal.component.html',
  styleUrls: ['./columns-layout-modal.component.css']
})
export class ColumnsLayoutModalComponent {
  loadMode = this.data.action.loadMode;
  saveMode = this.data.action.saveMode;
  layoutitle: string = '';
  defaultLayout: boolean = false;
  allSavedLayout:any = [];
  postLayout!: ColumnsLayout;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ColumnsLayoutModalComponent>,
    private apiClient: ApiClientService,
  ) {
    this.postLayout = {
      title: '',
      defaultColumns: data.layout,
      defaultLayout: false
    }
    console.log("data fetched in load layout dialog", this.allSavedLayout);
    
  }
  
  saveColumnsLayout() {
    console.log(this.layoutitle, this.defaultLayout);
    this.postLayout.title = this.layoutitle;
    this.postLayout.defaultColumns = this.data.layout.defaultColumns;
    this.postLayout.defaultLayout = this.defaultLayout;
    this.allSavedLayout.push(this.postLayout);
    // this.dialogRef.close({title: this.layoutitle, defaultLayout: this.defaultLayout, defaultColumns: this.allSavedLayout.defaultColumns})
    console.log("save data function's saved layout: ", this.allSavedLayout);
    const header = {
      'Content-Type': 'application.json',
    }
    this.apiClient.postData('http://localhost:3000/columnslayout', this.allSavedLayout, header)
    .then(data => console.log("successfully posting data",data))
    .catch(error => console.log(error))
    this.dialogRef.close()
  }

  loadColumnLayout() {
    console.log("load dialog bnd hony se pehly",this.allSavedLayout);
    this.dialogRef.close(this.allSavedLayout)
  }

  close() {
    this.dialogRef.close();
  }

  eventHandler() {
    if(this.loadMode === true) {
      this.loadColumnLayout()
    }
    else {
      this.saveColumnsLayout()
    }
  }
}
