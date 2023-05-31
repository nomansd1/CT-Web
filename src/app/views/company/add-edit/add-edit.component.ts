import { Component } from '@angular/core';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  navigationMenu: any = [
    { type: 'input', class: ''},
    { label: 'Principle', type: 'button', class: 'btn primary__btn mx-1', icon: 'Sell'},
    { label: 'Bulk Edit', type: 'button', class: 'btn primary__btn mx-1', icon: 'edit_note'},
    { label: 'Cancel Edit', type: 'button', class: 'btn danger__btn mx-1 !hidden', icon: 'edit'},
    { label: 'Edit', type: 'button', class: 'btn outline__btn mx-1', icon: 'edit'},
    { label: 'New', type: 'button', class: 'btn outline__btn mx-1', icon: 'add'},

  ]
}
