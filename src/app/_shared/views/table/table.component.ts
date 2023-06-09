import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableColumns } from 'src/app/models/table.model';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ColumnVisibilityModalComponent } from '../modals/column-visibility-modal/column-visibility-modal.component';
import { UploadFileModalComponent } from '../modals/upload-file-modal/upload-file-modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnInit, OnChanges  {
  @Input() columns!: string[];
  @Input() data!: any[];
  @Input() action1!: boolean;
  
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedColumns: string[] = [];
  
  constructor(private router: Router, public dialog: MatDialog) {}
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.updateDisplayedColumns();
    // this.displayedColumns = this.columns.concat(['actionsColumn'])
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.updateDisplayedColumns();
    }
  }
  
  applyFilter() {
    console.log("hello");
  }

  updateDisplayedColumns(): void {
    this.displayedColumns = this.columns.concat(['actionsColumn']);
  }
  openDialog() {
    const dialogRef = this.dialog.open(ColumnVisibilityModalComponent, {
      width: '400px', // Set the width of the dialog as per your requirement
      data: { 
        allColumns: this.columns,
        selectedColumns: this.columns.slice(0, -1)
      },
      // disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.columns = result.concat(['actionsColumn']); // Update the displayedColumns array with the selected columns
        console.log(this.columns);
      }
    });
  }

  uploadFileDialog() {
    const dialogRef = this.dialog.open(UploadFileModalComponent, {
      width: '700px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
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


