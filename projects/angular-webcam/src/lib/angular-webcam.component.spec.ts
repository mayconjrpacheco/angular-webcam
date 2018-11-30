import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularWebcamComponent } from './angular-webcam.component';

describe('AngularWebcamComponent', () => {
  let component: AngularWebcamComponent;
  let fixture: ComponentFixture<AngularWebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularWebcamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
