import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
export class TableComponent implements OnChanges, AfterViewInit, OnInit {
  // Decorators and Properties
  @Input() columns!: string[];
  @Input() data!: any[];
  @Input() action1!: boolean;
  @Input() searchQuery!: string;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  selectedColumns?: any;
  savedLayout!: ColumnsLayout;
  allLayouts:any = [];
  showFilter = false;
  filterColumnData: any[] = [];
  selectedFilterColumn: string | null = '';
  selectedOptions: boolean[] = [];
  selectAllChecked = false;
  defaultLayoutLoad: any;
  isDefaultLayout = false

  // Child components load
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private apiClient: ApiClientService,
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

  loadDefaultLayout() {
    console.log("load run hogya");
    this.apiClient.getData('http://localhost:3000/columnslayout')
      .then(data => {
        const filteredLayoutData = data.filter((obj: any) => obj.defaultLayout === true);
        const lastIndex = filteredLayoutData.length - 1;
        const lastLayout = filteredLayoutData[lastIndex];
        this.defaultLayoutLoad = lastLayout.defaultColumns;
        this.isDefaultLayout = lastLayout.defaultLayout;
        console.log("default load layout: ", this.defaultLayoutLoad, "this.isDefaultLayout", this.isDefaultLayout);
      })
      .catch(error => console.log(error))
      this.displayedColumns = this.defaultLayoutLoad.concat(['actionsColumn']);
      this.selectedColumns = this.defaultLayoutLoad;
  }

  // Initialization of table
  initializeTable(): void {
    console.log("initialize run hogya");
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.displayedColumns = this.columns.concat(['actionsColumn']);
    this.selectedColumns = this.columns;
    // this.loadDefaultLayout()
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

  onMenuOpened(): void {
    const menuPanel = document.querySelector('.cdk-overlay-pane.mat-menu-panel') as HTMLElement;
    menuPanel.style.pointerEvents = 'auto';
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
  openDialog(): void {
    const dialogRef = this.dialog.open(ColumnVisibilityModalComponent, {
      width: '500px',
      height: '500px', // Set the width of the dialog as per your requirement
      data: { 
        allColumns: this.columns,
        selectedColumns: this.selectedColumns
      },
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      this.selectedColumns = result.selectedCol;  // Assign the result to selectedColumns property
      const selectedOption: any = result.selectedOption;
      if (this.selectedColumns) {
        this.displayedColumns = [...this.selectedColumns, 'actionsColumn'];
        // this.displayedColumns = [...result.defaultColumns];
        // this.selectedColumns = [...result.defaultColumns];
      }
      else {        
        this.displayedColumns = [...this.columns, 'actionsColumn'];
      }
      if (selectedOption) {
        this.displayedColumns = [...selectedOption.defaultColumns,'actionsColumn'];
        this.selectedColumns = [...selectedOption.defaultColumns];  
      }
    });
  }

  
  // Save column layout modal
  // saveLayoutDialog() {
  //   const dialogRef = this.dialog.open(ColumnsLayoutModalComponent, {
  //     width: '700px',
  //     data: {
  //       modalTitle: 'Save Layout',
  //       title: 'title',
  //       action: {saveMode: true, loadMode: false },
  //       button: 'Save',
  //       layout: this.savedLayout ={
  //         title: '',
  //         defaultLayout: false,
  //         defaultColumns: this.displayedColumns,
  //         isDefaultLayout: false
  //       }
  //     },
  //     disableClose: true
  //   });

  // }
  
  // Load column layout modal
  // loadLayoutDialog() {
  //   const dialogRef = this.dialog.open(ColumnsLayoutModalComponent, {
  //     width: '700px',
  //     data: {
  //       modalTitle: 'Load Layout',
  //       title: 'Layout(s)',
  //       action: {saveMode: false, loadMode: true },
  //       button: 'Load'
  //     },
  //     disableClose: true
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log("load layout ko update karny walyyy columns", result);
  //       this.displayedColumns = [...result.defaultColumns];
  //       this.selectedColumns = [...result.defaultColumns];
  //     }
  //   });
  // }
  
  // Upload File modal
  uploadFileDialog() {
    const dialogRef = this.dialog.open(UploadFileModalComponent, {
      width: '700px',
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
}


