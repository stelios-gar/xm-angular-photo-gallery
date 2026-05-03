import { Injectable } from '@angular/core';
import { Photo } from '../../shared/models/photo';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly storageKey = 'favoritePhotos';

  getFavorites(): Photo[] {
    const storedFavorites = localStorage.getItem(this.storageKey);

    if (!storedFavorites) {
      return [];
    }

    return JSON.parse(storedFavorites) as Photo[];
  }

  addFavorite(photo: Photo): void {
    const favorites = this.getFavorites();

    const alreadyExists = favorites.some(favorite => favorite.id === photo.id);

    if (alreadyExists) {
      return;
    }

    favorites.push(photo);
    this.saveFavorites(favorites);
  }

  removeFavorite(photoId: string): void {
    const favorites = this.getFavorites()
      .filter(favorite => favorite.id !== photoId);

    this.saveFavorites(favorites);
  }

  isFavorite(photoId: string): boolean {
    return this.getFavorites()
      .some(favorite => favorite.id === photoId);
  }

  getFavoriteById(photoId: string): Photo | undefined {
    return this.getFavorites()
      .find(favorite => favorite.id === photoId);
  }

  private saveFavorites(favorites: Photo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}