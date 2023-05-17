import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() options!: any[]; 
  @Input() defaultOption!: any;
  @Input() bindingLabel!: any;
  @Output() selectChange = new EventEmitter<number>();

  onValueChange(value: number) {
    this.selectChange.emit(value);
    console.log(value);  
  }

}
