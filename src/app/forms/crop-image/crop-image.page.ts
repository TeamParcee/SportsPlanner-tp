
import { Component, OnInit } from '@angular/core';
import { TPHelper } from 'src/app/services/tp-helper';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.page.html',
  styleUrls: ['./crop-image.page.scss'],
})
export class CropImagePage implements OnInit {

  constructor(
    private helper: TPHelper,
  ) { }

  imageFile: File;
  ngOnInit() {
  }

  cancel() {
    this.helper.closeModal();
  }


  imageChangedEvent;
  croppedImage: any = '';

  ionViewWillEnter() {
  }

  close() {
    this.helper.closeModal()
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event) {
    this.croppedImage = event.base64;
  }

  save() {
    this.helper.closeModal(this.croppedImage)
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}