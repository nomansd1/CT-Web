import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file-modal',
  templateUrl: './upload-file-modal.component.html',
  styleUrls: ['./upload-file-modal.component.css']
})
export class UploadFileModalComponent {
  selectedAction: string | null = "select";
  showFileInput = false;
}
