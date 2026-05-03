import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Photo } from '../../../shared/models/photo';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  favoritePhotos: Photo[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.favoritePhotos = this.favoritesService.getFavorites();
  }

  openPhoto(photo: Photo): void {
    this.router.navigate(['/photos', photo.id]);
  }
}