import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AngularWebcamService {

  getPicture: EventEmitter<any> = new EventEmitter<any>()
  mobileCamera: string;

  constructor() { }

  initialize(config: any) {
    this.mobileCamera = config.mobileCamera;
  }

  takePicture() {
    this.getPicture.emit();
  }
}
