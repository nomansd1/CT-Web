import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-index-body',
  templateUrl: './index-body.component.html',
  styleUrls: ['./index-body.component.css']
})
export class IndexBodyComponent {
  @Input() tableColumns!: string[];
}
