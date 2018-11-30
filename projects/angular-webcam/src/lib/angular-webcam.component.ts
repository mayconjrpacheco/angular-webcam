import { Component, OnInit, ElementRef, Renderer2, Input , Output, EventEmitter, OnDestroy, OnChanges} from '@angular/core';
import { AngularWebcamService } from './angular-webcam.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'angular-webcam',
  template: `
    <div id="canvas-wrapper">
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
  `,
  styles: [
     `
    canvas, video {
      max-width: 100%;
    }
    `
  ]
})
export class AngularWebcamComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public fullscreen: boolean;
  @Input() public facingMode: boolean;
  @Output() public handleTakePicture: EventEmitter<any> = new EventEmitter<any>();

  private track: MediaStreamTrack;
  private loopFrame: number;
  private width: number;
  private height: number;
  private video: HTMLVideoElement;
  private _getPicture$: Subscription;

  constructor(private elementRef: ElementRef,
              private angulaWebcamService: AngularWebcamService,
              private renderer: Renderer2) {

    this.loop = this.loop.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
  }

  get canvas(): HTMLCanvasElement {
    return this.elementRef.nativeElement.querySelector('#canvas');
  }

  get ctx(): CanvasRenderingContext2D {
    return this.canvas.getContext('2d');
  }

  get canvasWrapper(): HTMLDivElement {
    return this.elementRef.nativeElement.querySelector('#canvas-wrapper');
  }

  ngOnInit() {
    this.getWebcam();
    this.handleGetPicture();
    this.setVideoElement();
    this.setVideoAttributes();
    this.setHandlerVideoLoadMetadata();
  }

  ngOnDestroy() {
    this._getPicture$.unsubscribe();
  }

  private setSizeProperties() {
    this.width = this.canvas.width = this.video.videoWidth;
    this.height = this.canvas.height = this.video.videoHeight;
  }

  private setHandlerVideoLoadMetadata() {
    this.renderer.listen(this.video, 'loadedmetadata', this.onLoadedMetadata);
  }

  private onLoadedMetadata() {
    this.setSizeProperties();
    this.startLoop();
    this.emitResize();
  }

  private setVideoElement() {
    this.video = this.renderer.createElement('video');
  }

  private setVideoAttributes() {
    this.video.setAttribute('autoplay', 'true');
  }

  private handleGetPicture() {
    this._getPicture$ = this.angulaWebcamService.getPicture.subscribe(
      () => this.handleTakePicture.emit(this.takePicture())
    );
  }

  private getWebcam() {
    this.getStremFromGetUserMedia().then(
      stream => this.getStremFromGetUserMediaSuccess(stream),
      error => this.getStremFromGetUserMediaError(error)
    );
  }

  private getStremFromGetUserMedia(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({ video: true });
  }

  private getStremFromGetUserMediaSuccess(stream: any) {
    this.video.srcObject = stream;
    this.track = stream.getTracks()[0];
  }

  private getStremFromGetUserMediaError(error: any) {
    alert(error);
  }

  private loop() {
    this.setLoopFrame();
    this.setCanvasPropertiesForCapture();
  }

  private setLoopFrame() {
    this.loopFrame = requestAnimationFrame(this.loop);
  }

  private setCanvasPropertiesForCapture() {
    this.ctx.save();
    this.ctx.translate(this.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
    this.ctx.restore();
  }

  private startLoop() {
    this.verifyForSetResizeEventListener();
    this.loop();
  }

  private setWindowResizeEventListener() {
    this.renderer.listen(window, 'resize', this.onResize);
  }

  private emitResize() {
    window.dispatchEvent(new Event('resize'));
  }

  private onResize() {
    const ratio = this.canvas.width / this.canvas.height;
    let canvasHeight = window.innerHeight;
    let canvasWidth = canvasHeight * ratio;

    if(canvasWidth>window.innerWidth){
      canvasWidth=window.innerWidth;
      canvasHeight=canvasWidth/ratio;
    }

    this.setResizeForElements(canvasWidth, canvasHeight);
  }

  private verifyForSetResizeEventListener() {
    if (!this.fullscreen) {
      return;
    }

    this.setWindowResizeEventListener();
    this.setStyleFullscren();
  }

  private setStyleFullscren() {
    this.video.style.maxWidth = this.canvas.style.maxWidth = '100%';
    this.video.style.height = this.canvas.style.height = '100vh';
    this.video.style.margin = this.canvas.style.margin = '0 auto';
    this.canvasWrapper.style.position = 'absolute';
    this.canvasWrapper.style.top = '50%';
    this.canvasWrapper.style.left = '50%';
    this.canvasWrapper.style.transform = 'translate(-50%,-50%)';
  }

  private setResizeForElements(canvasWidth: number, canvasHeight: number) {
    this.canvas.style.width = canvasWidth + 'px';
    this.canvas.style.height = canvasHeight + 'px';
    this.canvasWrapper.style.width = canvasWidth + 'px';
    this.canvasWrapper.style.height = canvasHeight + 'px';
  }

  takePicture() {
    this.ctx.drawImage(this.video, 0, 0, this.width*-1, this.height);
    return this.canvas.toDataURL("image/png");
  }

}
