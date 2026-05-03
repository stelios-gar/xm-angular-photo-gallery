/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Photo } from '../../shared/models/photo';

describe('FavoritesService', () => {
  let service: FavoritesService;

  const photo: Photo = {
    id: 'photo-1',
    url: 'https://picsum.photos/seed/photo-1/200/300',
    detailUrl: 'https://picsum.photos/seed/photo-1/600/800'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array when there are no favorites', () => {
    expect(service.getFavorites()).toEqual([]);
  });

  it('should add a photo to favorites', () => {
    service.addFavorite(photo);

    expect(service.getFavorites()).toEqual([photo]);
  });

  it('should persist favorites in localStorage', () => {
    service.addFavorite(photo);

    const storedFavorites = JSON.parse(localStorage.getItem('favoritePhotos') ?? '[]');

    expect(storedFavorites).toEqual([photo]);
  });

  it('should not add duplicate photos', () => {
    service.addFavorite(photo);
    service.addFavorite(photo);

    expect(service.getFavorites().length).toBe(1);
  });

  it('should remove a photo from favorites', () => {
    service.addFavorite(photo);

    service.removeFavorite(photo.id);

    expect(service.getFavorites()).toEqual([]);
  });

  it('should check if a photo is favorite', () => {
    service.addFavorite(photo);

    expect(service.isFavorite(photo.id)).toBeTrue();
    expect(service.isFavorite('unknown-photo')).toBeFalse();
  });

  it('should get a favorite photo by id', () => {
    service.addFavorite(photo);

    expect(service.getFavoriteById(photo.id)).toEqual(photo);
  });

  it('should return undefined when a favorite photo is not found', () => {
    expect(service.getFavoriteById('unknown-photo')).toBeUndefined();
  });
});