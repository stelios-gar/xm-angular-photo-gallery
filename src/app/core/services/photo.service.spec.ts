/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate the requested number of photos', done => {
    service.getPhotos(3).subscribe(photos => {
      expect(photos.length).toBe(3);
      done();
    });
  });

  it('should generate photos with id, url and detailUrl', done => {
    service.getPhotos(1).subscribe(photos => {
      const photo = photos[0];

      expect(photo.id).toBe('photo-1');
      expect(photo.url).toBe('https://picsum.photos/seed/photo-1/200/300');
      expect(photo.detailUrl).toBe('https://picsum.photos/seed/photo-1/600/800');
      done();
    });
  });

  it('should generate a photo by id', () => {
    const photo = service.getPhotoById('photo-10');

    expect(photo).toEqual({
      id: 'photo-10',
      url: 'https://picsum.photos/seed/photo-10/200/300',
      detailUrl: 'https://picsum.photos/seed/photo-10/600/800'
    });
  });
});