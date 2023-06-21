import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-index-header',
  templateUrl: './index-header.component.html',
  styleUrls: ['./index-header.component.css']
})
export class IndexHeaderComponent {
  @Input() title!: string;
  @Output() searchChange = new EventEmitter<string>();
  @Input() showTableSearch = true;
  
  
  isSearchBarHidden = true;

  toggleSearchbar() {
    this.isSearchBarHidden = !this.isSearchBarHidden;
  }


  onSearch(value: string) {
    debugger
    this.searchChange.emit(value);
<<<<<<< HEAD
    
=======
    console.log(value);
>>>>>>> 45b6352a6128405bb255779655c95c6afc6df4c4
  }
}
