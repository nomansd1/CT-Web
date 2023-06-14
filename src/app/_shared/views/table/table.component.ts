import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ColumnVisibilityModalComponent } from '../modals/column-visibility-modal/column-visibility-modal.component';
import { UploadFileModalComponent } from '../modals/upload-file-modal/upload-file-modal.component';
import { ColumnsLayoutModalComponent } from '../modals/columns-layout-modal/columns-layout-modal.component';
import { ColumnsLayout } from 'src/app/models/columnsLayout.model';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnInit {
  // Decorators and Properties
  @Input() columns!: string[];
  @Input() data!: any[];
  @Input() action1!: boolean;
  
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  selectedColumns?: string[];
  savedLayout!: ColumnsLayout;
  allLayouts:any = []

  // Child components load
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private router: Router, 
    public dialog: MatDialog,
  ) {}
  
  // Lifecycle methods
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.displayedColumns = this.columns.concat(['actionsColumn'])
    this.selectedColumns = this.columns
    this.savedLayout = {
      title: '',
      defaultLayout: false,
      defaultColumns: this.displayedColumns,
    }
  }

// Methods
  applyFilter() {
    console.log("hello");
  }

  openDialog() {
    const dialogRef = this.dialog.open(ColumnVisibilityModalComponent, {
      width: '400px', // Set the width of the dialog as per your requirement
      data: { 
        allColumns: this.columns,
        selectedColumns: this.selectedColumns
      },
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe((result: string[]) => {
      if (result) {
        this.selectedColumns = result; // Assign the result to selectedColumns property
        this.displayedColumns = [...this.selectedColumns, 'actionsColumn'];
      }
      else {
        this.displayedColumns = [...this.columns, 'actionsColumn'];
      }
    });
  }

  uploadFileDialog() {
    const dialogRef = this.dialog.open(UploadFileModalComponent, {
      width: '700px',
    });
  
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result); 
    // });
  }

  saveLayoutDialog() {
    const dialogRef = this.dialog.open(ColumnsLayoutModalComponent, {
      width: '700px',
      data: {
        modalTitle: 'Save Layout',
        title: 'title',
        action: {saveMode: true, loadMode: false },
        button: 'Save',
        layout: this.savedLayout
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.savedLayout.title = result.title;
        // this.savedLayout.defaultLayout = result.defaultLayout;
        // this.savedLayout.defaultColumns = this.displayedColumns;
        // this.allLayouts.push(this.savedLayout);        
      }
    });
  }
  
  loadLayoutDialog() {
    const dialogRef = this.dialog.open(ColumnsLayoutModalComponent, {
      width: '700px',
      data: {
        modalTitle: 'Load Layout',
        title: 'Layout(s)',
        action: {saveMode: false, loadMode: true },
        // layout: this.allLayouts,
        button: 'Load'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("load layout ko update karny walyyy columns",result.allSavedLayout);
        // this.displayedColumns = [...result.allSavedLayout.defaultColumns, 'actionsColumn'];
      }
    });
  }
  
  














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

  navigateToAddEdit(id: number) {
    const currentRoute = this.router.url;
    const routeParts = currentRoute.split('/');
    const context = routeParts[1]; // Assuming the context is the first part of the URL
    const addEditRoute = `/${context}/add-edit/${id}`;
    this.router.navigate([addEditRoute]);
  }
}


