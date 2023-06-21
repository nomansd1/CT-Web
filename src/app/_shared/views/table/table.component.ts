import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ColumnVisibilityModalComponent } from '../modals/column-visibility-modal/column-visibility-modal.component';
import { UploadFileModalComponent } from '../modals/upload-file-modal/upload-file-modal.component';
import { ColumnsLayoutModalComponent } from '../modals/columns-layout-modal/columns-layout-modal.component';
import { ColumnsLayout } from 'src/app/models/columnsLayout.model';
import { ApiClientService } from 'src/app/services/api-client.service';
import { HttpClient } from '@angular/common/http';
import { AddEditComponent } from 'src/app/views/company/add-edit/add-edit.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges, AfterViewInit, OnInit {
  // Decorators and Properties
  @Input() columns!: string[];
  @Input() data!: any[];
  @Input() action1!: boolean;
  
  // dataSource!: MatTableDataSource<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  selectedColumns?: string[];
  savedLayout!: ColumnsLayout;
  allLayouts:any = [];
  showFilter = false;
  filterColumnData: any[] = [];
  selectedFilterColumn: string | null = '';
  selectedOptions: boolean[] = [];
  selectAllChecked = false;
  



  // pagination
  totalItems = 0; // Total number of items
  pageSize = 10;

  // Child components load
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id!: any;
  searchQuery: any;


  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private http: HttpClient
  ) {}
  
  // Lifecycle methods
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.initializeTable()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery']) {
      this.filterTableData();
    }
  }

  // Initialization of table
  initializeTable(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.displayedColumns = this.columns.concat(['actionsColumn']);
    this.selectedColumns = this.columns;
  }

// Master search for whole table data 
  filterTableData(): void {
    if (this.searchQuery) {
      this.dataSource.filter = this.searchQuery.trim().toLowerCase();
    } else {
      this.dataSource.filter  = '';
    }
    this.dataSource.paginator?.firstPage();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  // Columns wise filtering
  applyFilter() {
    this.showFilter = true;
  }
  getColumnData(column: string, event: Event): void {
    event.stopPropagation();
    setTimeout(() => {
      // this.showFilter = false;
      this.filterColumnData = [...new Set(this.data.map((row: any) => row[column]))];
      this.selectedFilterColumn = column;
      console.log(this.filterColumnData);
    });
  }
  toggleSelectAll() {
    if (this.selectAllChecked) {
      console.log(":the value has bee checked");
    } else {
      console.log(":the value has not been checked")
    }
  }
  
// Show and Load layout modal
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
        this.displayedColumns = [...this.columns];
      }
    });
  }

  // Upload File modal
  uploadFileDialog() {
    const dialogRef = this.dialog.open(UploadFileModalComponent, {
      width: '700px',
    });
  }

  // Save column layout modal
  saveLayoutDialog() {
    const dialogRef = this.dialog.open(ColumnsLayoutModalComponent, {
      width: '700px',
      data: {
        modalTitle: 'Save Layout',
        title: 'title',
        action: {saveMode: true, loadMode: false },
        button: 'Save',
        layout: this.savedLayout ={
          title: '',
          defaultLayout: false,
          defaultColumns: this.displayedColumns,
          isDefaultLayout: false
        }
      },
      disableClose: true
    });

  }
  
  // Load column layout modal
  loadLayoutDialog() {
    const dialogRef = this.dialog.open(ColumnsLayoutModalComponent, {
      width: '700px',
      data: {
        modalTitle: 'Load Layout',
        title: 'Layout(s)',
        action: {saveMode: false, loadMode: true },
        button: 'Load'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("load layout ko update karny walyyy columns", result);
        this.displayedColumns = [...result.defaultColumns];
        this.selectedColumns = [...result.defaultColumns];
      }
    });
  }
  
// Navigation to add-edit
  navigateToAddEdit(id: number) {
    const currentRoute = this.router.url;
    const routeParts = currentRoute.split('/');
    const context = routeParts[1]; // Assuming the context is the first part of the URL
    const addEditRoute = `/${context}/add-edit/${id}`;
    this.router.navigate([addEditRoute]);
  }

  // openEditForm(data: any) {
  //   const dialogRef = this.dialog.open(AddEditComponent, {
  //     data,
  //   });}




  // Serve side paginator

  loadData() {
    const url = 'http://localhost:3000/tableData';
  
    this.http.get<any[]>(url).subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.totalItems = data.length;
      this.dataSource.paginator = this.paginator;
    });
  }
  onPageChanged(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
  
    this.http.get<any[]>('http://localhost:3000/tableData').subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data.slice(startIndex, endIndex));
    });
  }
 
}


