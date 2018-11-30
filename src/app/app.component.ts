import { Component } from '@angular/core';
import { AngularWebcamService } from 'projects/angular-webcam/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-webcam-app';

  currentSrcImage: string;

  constructor(private angularWebcamService: AngularWebcamService) {

  }

  onClickTakePicture() {
    this.angularWebcamService.takePicture();
  }

  onClickRotateCamera() {

  }

  onTakePicture(imageSrc: string) {
    this.currentSrcImage = imageSrc;
  }
}
