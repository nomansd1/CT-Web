import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';
import { SearchResult } from 'src/app/models/search.model'
import { AuthGuard } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoggedIn = true;
  isDropdownActive = true;
  dropdownIcons = ["group", "fact_check", "check_circle", "help", "logout"];
  dropdownText = ["Profile", "Audit Log", "Approvals", "Help", "Sign out"];
  headerIcons = ["devices_other", "star", "info", "priority_high", "notifications", "chat", "warning"];
  headerTitle = ["Variant Settings", "Favorites", "Info", "Alert", "Notifications", "Chatter", "Corrections"]
  searchQuery: string = '';
  allResults: SearchResult[] = [];
  filteredResults: SearchResult[] = [];
  showResults = false;
  selectedIndex = -1;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private apiClient: ApiClientService,
    private authGuard: AuthGuard,
    private router: Router
  ) { }

  toggleDropdown() {
    this.isDropdownActive = !this.isDropdownActive;
  }

  ngOnInit(): void {
    this.apiClient.getData('../../../../assets/results.json').then(results => {
      this.allResults = results;
      this.filterResults();
    })
  }
  filterResults() {
    this.filteredResults = this.allResults.filter(result => {
      return result.title.toLowerCase().includes(this.searchQuery);
    });
    this.searchQuery.length > 0 ? this.showResults = true : this.showResults = false;
  }
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
  onArrowDown() {
    if (this.selectedIndex < this.filteredResults.length - 1) {
      this.selectedIndex++;
    }
  }

  onArrowUp() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }
  onEnter(index?: number) {
    if (index === undefined) {
      return;
    }
    const result = this.filteredResults[index];
    // this.router.navigateByUrl(result.link);
    window.location.href = result.link
  }
  onLogout() {
    this.authGuard.logout()
  }
}
