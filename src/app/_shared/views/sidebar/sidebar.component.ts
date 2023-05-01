import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';
import { SidebarMenu } from 'src/app/models/Sidebar.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isOpen = false;
  panelOpenState = false;
  hideToggle = true;
  allResults: SidebarMenu[] = [];
  @Input() sidebarVisible = false;
  
  expandedIndex = -1;

  constructor(private apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.apiClient.getData('http://localhost:4000/menu').then(results => {
      this.allResults = results;
      console.log(this.allResults[0].title);
      
    }).catch(error => console.log(error)) 
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
}
