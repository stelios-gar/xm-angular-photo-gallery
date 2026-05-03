/// <reference types="jasmine" />

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PhotosPageComponent } from './photos-page.component';
import { PhotoCardComponent } from '../../../shared/components/photo-card/photo-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { PhotoService } from '../../../core/services/photo.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Photo } from '../../../shared/models/photo';

describe('PhotosPageComponent', () => {
  let component: PhotosPageComponent;
  let fixture: ComponentFixture<PhotosPageComponent>;
  let photoService: jasmine.SpyObj<PhotoService>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const photos: Photo[] = [
    {
      id: 'photo-1',
      url: 'https://picsum.photos/seed/photo-1/200/300',
      detailUrl: 'https://picsum.photos/seed/photo-1/600/800'
    }
  ];

  beforeEach(() => {
    photoService = jasmine.createSpyObj<PhotoService>('PhotoService', ['getPhotos']);
    favoritesService = jasmine.createSpyObj<FavoritesService>('FavoritesService', ['addFavorite', 'isFavorite']);
    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

    photoService.getPhotos.and.returnValue(of(photos));
    favoritesService.isFavorite.and.returnValue(false);

    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        MatCardModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule
      ],
      declarations: [
        PhotosPageComponent,
        PhotoCardComponent,
        LoadingSpinnerComponent
      ],
      providers: [
        { provide: PhotoService, useValue: photoService },
        { provide: FavoritesService, useValue: favoritesService },
        { provide: MatSnackBar, useValue: snackBar }
      ]
    });

    fixture = TestBed.createComponent(PhotosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load photos on init', () => {
    expect(photoService.getPhotos).toHaveBeenCalled();
    expect(component.photos).toEqual(photos);
  });

  it('should not load photos while already loading', () => {
    photoService.getPhotos.calls.reset();
    component.loading = true;

    component.loadPhotos();

    expect(photoService.getPhotos).not.toHaveBeenCalled();
  });

  it('should set loading to false when photo loading fails', () => {
    photoService.getPhotos.calls.reset();
    photoService.getPhotos.and.returnValue(throwError(() => new Error('Failed')));
    component.loading = false;

    component.loadPhotos();

    expect(component.loading).toBeFalse();
  });

  it('should load photos when scrolling near the bottom', () => {
    spyOn(component, 'loadPhotos');

    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1500, configurable: true });

    component.onWindowScroll();

    expect(component.loadPhotos).toHaveBeenCalled();
  });

  it('should not load photos when scrolling far from the bottom', () => {
    spyOn(component, 'loadPhotos');

    Object.defineProperty(window, 'innerHeight', { value: 500, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true });

    component.onWindowScroll();

    expect(component.loadPhotos).not.toHaveBeenCalled();
  });

  it('should load more photos when the page is not scrollable', () => {
    spyOn(component, 'loadPhotos');
    component.loading = false;

    Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 900, configurable: true });

    (component as any).loadMoreIfPageIsNotScrollable();

    expect(component.loadPhotos).toHaveBeenCalled();
  });

  it('should not load more photos when the page is already scrollable', () => {
    spyOn(component, 'loadPhotos');
    component.loading = false;

    Object.defineProperty(window, 'innerHeight', { value: 700, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1200, configurable: true });

    (component as any).loadMoreIfPageIsNotScrollable();

    expect(component.loadPhotos).not.toHaveBeenCalled();
  });

  it('should add a photo to favorites', () => {
    component.addToFavorites(photos[0]);

    expect(favoritesService.addFavorite).toHaveBeenCalledWith(photos[0]);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Photo added to favorites',
      'Close',
      { duration: 2000 }
    );
  });

  it('should show a different message when photo is already favorite', () => {
    favoritesService.isFavorite.and.returnValue(true);

    component.addToFavorites(photos[0]);

    expect(snackBar.open).toHaveBeenCalledWith(
      'Photo is already in favorites',
      'Close',
      { duration: 2000 }
    );
  });
});