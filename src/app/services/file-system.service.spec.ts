import { TestBed, inject } from '@angular/core/testing';

import { FileSystemService } from './file-system.service';

describe('FileSystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileSystemService]
    });
  });

  it('should be created', inject([FileSystemService], (service: FileSystemService) => {
    expect(service).toBeTruthy();
  }));
});
