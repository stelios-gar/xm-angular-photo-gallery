/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FavoritesPageComponent } from './favorites-page.component';
import { PhotoCardComponent } from '../../../shared/components/photo-card/photo-card.component';
import { FavoritesService } from '../../../core/services/favorites.service';
import { MatCardModule } from '@angular/material/card';
import { Photo } from '../../../shared/models/photo';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;
  let router: jasmine.SpyObj<Router>;

  const favoritePhotos: Photo[] = [
    {
      id: 'photo-1',
      url: 'https://picsum.photos/seed/photo-1/200/300',
      detailUrl: 'https://picsum.photos/seed/photo-1/600/800'
    }
  ];

  beforeEach(() => {
    favoritesService = jasmine.createSpyObj<FavoritesService>('FavoritesService', ['getFavorites']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    favoritesService.getFavorites.and.returnValue(favoritePhotos);

    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [
        FavoritesPageComponent,
        PhotoCardComponent
      ],
      providers: [
        { provide: FavoritesService, useValue: favoritesService },
        { provide: Router, useValue: router }
      ]
    });

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorite photos on init', () => {
    expect(favoritesService.getFavorites).toHaveBeenCalled();
    expect(component.favoritePhotos).toEqual(favoritePhotos);
  });

  it('should navigate to photo detail when opening a photo', () => {
    component.openPhoto(favoritePhotos[0]);

    expect(router.navigate).toHaveBeenCalledWith(['/photos', favoritePhotos[0].id]);
  });
});