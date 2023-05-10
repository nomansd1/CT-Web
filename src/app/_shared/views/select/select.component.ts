import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() options!: any[]; 
  @Input() defaultOption!: any;
  @Input() bindingLabel!: any;

  ngOnInit() {
    console.log(this.options)
  }
 
}
