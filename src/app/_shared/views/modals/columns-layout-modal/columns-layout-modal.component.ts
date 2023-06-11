import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  allSavedLayout!:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ColumnsLayoutModalComponent>,
    private apiClient: ApiClientService,
  ) {
    this.allSavedLayout = data.layout
    console.log("data fetched in load layout dialog", this.allSavedLayout);
    
  }

  saveColumnsLayout() {
    console.log(this.layoutitle, this.defaultLayout);
    this.dialogRef.close({title: this.layoutitle, defaultLayout: this.defaultLayout})
    this.apiClient.postData('http://localhost:3000/columnslayout/', this.allSavedLayout).then(data => console.log(data)).catch(error => console.log(error))
  }
  loadColumnLayout() {
    console.log("load dialog bnd hony se pehly",this.allSavedLayout);
    
    this.dialogRef.close(this.allSavedLayout)
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
