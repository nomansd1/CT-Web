import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CT-Web';
  sidebarVisible = false;

  constructor(public router: Router) {}

  onToggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    console.log('sidebarVisible:', this.sidebarVisible);
  }
}
