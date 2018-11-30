import { TestBed } from '@angular/core/testing';

import { AngularWebcamService } from './angular-webcam.service';

describe('AngularWebcamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularWebcamService = TestBed.get(AngularWebcamService);
    expect(service).toBeTruthy();
  });
});
