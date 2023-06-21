import { Component ,Inject, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  formGroup : FormGroup;
  ObjectForPatch={
    name:'xyz',
    ShortName:'abc'

  }

  constructor( private apiClient: ApiClientService, 
    private fb : FormBuilder,
    ){
    this.formGroup = this.fb.group({
      name:[''],
      ShortName :[''],
      Industry:[''],
      CountryCode:[''],
      Currency:[''],
      Language:[''],
      MrpCalculation:[''],
      MapCode:[''],
      LicenseKey:[''],
      Isactive:[''],
      ParentMenu:[''],
      PasswordPolicy:[''],
      AccountCode:[''],
      Accountname:[''],
      InterbranchControlAccountCode:[''],
      InterbranchControlAccountname:[''],
    });
  }

  navigationMenu: any = [
    { label: 'Principle', type: 'button', class: 'btn primary__btn mx-1', icon: 'Sell'},
    { label: 'Bulk Edit', type: 'button', class: 'btn primary__btn mx-1', icon: 'edit_note'},
    { label: 'Cancel Edit', type: 'button', class: 'btn danger__btn mx-1 !hidden', icon: 'edit'},
    { label: 'Edit', type: 'button', class: 'btn outline__btn mx-1', icon: 'edit'},
    { label: 'New', type: 'button', class: 'btn outline__btn mx-1', icon: 'add'},
  ]
  isChecked = false


  patchvalue(){
    this.formGroup.patchValue({
      name:'Acme corporation'
    });
    this.formGroup.updateValueAndValidity();
  }
  
}
