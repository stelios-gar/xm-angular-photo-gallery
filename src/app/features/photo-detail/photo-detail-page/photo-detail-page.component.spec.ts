/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoDetailPageComponent } from './photo-detail-page.component';
import { FavoritesService } from '../../../core/services/favorites.service';
import { PhotoService } from '../../../core/services/photo.service';
import { MatButtonModule } from '@angular/material/button';
import { Photo } from '../../../shared/models/photo';

describe('PhotoDetailPageComponent', () => {
  let component: PhotoDetailPageComponent;
  let fixture: ComponentFixture<PhotoDetailPageComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;
  let photoService: jasmine.SpyObj<PhotoService>;
  let router: jasmine.SpyObj<Router>;

  const photo: Photo = {
    id: 'photo-1',
    url: 'https://picsum.photos/seed/photo-1/200/300',
    detailUrl: 'https://picsum.photos/seed/photo-1/600/800'
  };

  function setup(routeId: string | null, favoritePhoto: Photo | undefined | null): void {
    favoritesService = jasmine.createSpyObj<FavoritesService>('FavoritesService', [
      'getFavoriteById',
      'removeFavorite'
    ]);

    photoService = jasmine.createSpyObj<PhotoService>('PhotoService', ['getPhotoById']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    favoritesService.getFavoriteById.and.returnValue(favoritePhoto as Photo | undefined);
    photoService.getPhotoById.and.returnValue(photo);

    TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [PhotoDetailPageComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesService },
        { provide: PhotoService, useValue: photoService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => routeId
              }
            }
          }
        }
      ]
    });

    fixture = TestBed.createComponent(PhotoDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    setup('photo-1', photo);

    expect(component).toBeTruthy();
  });

  it('should load photo from favorites by route id', () => {
    setup('photo-1', photo);

    expect(favoritesService.getFavoriteById).toHaveBeenCalledWith('photo-1');
    expect(component.photo).toEqual(photo);
  });

  it('should fallback to PhotoService when photo is not found in favorites', () => {
    setup('photo-1', undefined);

    expect(photoService.getPhotoById).toHaveBeenCalledWith('photo-1');
    expect(component.photo).toEqual(photo);
  });

  it('should fallback to PhotoService when favorite lookup returns null', () => {
    setup('photo-1', null);

    expect(photoService.getPhotoById).toHaveBeenCalledWith('photo-1');
    expect(component.photo).toEqual(photo);
  });

  it('should navigate to favorites when route id is missing', () => {
    setup(null, photo);

    expect(router.navigate).toHaveBeenCalledWith(['/favorites']);
  });

  it('should remove photo from favorites and navigate back to favorites', () => {
    setup('photo-1', photo);

    component.removeFromFavorites();

    expect(favoritesService.removeFavorite).toHaveBeenCalledWith(photo.id);
    expect(router.navigate).toHaveBeenCalledWith(['/favorites']);
  });

  it('should not remove anything when there is no photo', () => {
    setup('photo-1', photo);
    component.photo = undefined;

    component.removeFromFavorites();

    expect(favoritesService.removeFavorite).not.toHaveBeenCalled();
  });
});