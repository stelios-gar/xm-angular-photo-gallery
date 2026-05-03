import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Photo } from '../../shared/models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private nextPhotoIndex = 1;

  getPhotos(count: number): Observable<Photo[]> {
    const photos: Photo[] = Array.from({ length: count }, () => {
      const id = `photo-${this.nextPhotoIndex++}`;

      return {
        id,
        url: `https://picsum.photos/seed/${id}/200/300`
      };
    });

    return of(photos).pipe(delay(this.getRandomDelay()));
  }

  getPhotoById(id: string): Photo {
    return {
      id,
      url: `https://picsum.photos/seed/${id}/200/300`
    };
  }

  private getRandomDelay(): number {
    return Math.floor(Math.random() * 101) + 200;
  }
}