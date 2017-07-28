import { TestBed, inject } from '@angular/core/testing';

import { AngularFireDBService } from './angular-fire-db.service';

describe('AngularFireDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularFireDBService]
    });
  });

  it('should be created', inject([AngularFireDBService], (service: AngularFireDBService) => {
    expect(service).toBeTruthy();
  }));
});
