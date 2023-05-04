import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-index-header',
  templateUrl: './index-header.component.html',
  styleUrls: ['./index-header.component.css']
})
export class IndexHeaderComponent {
  @Input() title!: string;
  isSearchBarHidden = true;

  toggleSearchbar() {
    this.isSearchBarHidden = !this.isSearchBarHidden;
  }
}
