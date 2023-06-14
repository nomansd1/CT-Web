import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColumnsLayout } from 'src/app/models/columnsLayout.model';
import { ApiClientService } from 'src/app/services/api-client.service';


@Component({
  selector: 'app-columns-layout-modal',
  templateUrl: './columns-layout-modal.component.html',
  styleUrls: ['./columns-layout-modal.component.css']
})
export class ColumnsLayoutModalComponent implements OnInit{
  loadMode = this.data.action.loadMode;
  saveMode = this.data.action.saveMode;
  layoutitle: string = '';
  defaultLayout: boolean = false;
  allSavedLayout:any = [];
  postLayout!: ColumnsLayout;
  selectedOption: any = ''

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
  
  ngOnInit(): void {
    this.loadLayoutData()  
  }

  loadLayoutData() {
    this.apiClient.getData('http://localhost:3000/columnslayout')
    .then(data => {
      this.allSavedLayout = data;
      console.log("getting data in load func: ", data)
    })
    .catch(error => console.log(error))
  }

  saveColumnsLayout() {
    this.postLayout.title = this.layoutitle;
    this.postLayout.defaultColumns = this.data.layout.defaultColumns;
    this.postLayout.defaultLayout = this.defaultLayout;
    this.allSavedLayout.push(this.postLayout);
    JSON.stringify(this.postLayout);
    this.apiClient.postData('http://localhost:3000/columnslayout', this.postLayout)
    .then(data => console.log("successfully posting data",data))
    .catch(error => console.log(error))
    this.dialogRef.close()
  }

  loadColumnLayout() {
    console.log("load columns layout k andr selected col ki value ",this.selectedOption);
    this.dialogRef.close(this.selectedOption);
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
