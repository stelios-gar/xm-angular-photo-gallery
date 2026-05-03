import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '../../../core/services/favorites.service';
import { PhotoService } from '../../../core/services/photo.service';
import { Photo } from '../../../shared/models/photo';

@Component({
  selector: 'app-photo-detail-page',
  templateUrl: './photo-detail-page.component.html',
  styleUrls: ['./photo-detail-page.component.scss']
})
export class PhotoDetailPageComponent implements OnInit {
  photo?: Photo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    const photoId = this.route.snapshot.paramMap.get('id');

    if (!photoId) {
      this.router.navigate(['/favorites']);
      return;
    }

    this.photo =
      this.favoritesService.getFavoriteById(photoId) ??
      this.photoService.getPhotoById(photoId);
  }

  removeFromFavorites(): void {
    if (!this.photo) {
      return;
    }

    this.favoritesService.removeFavorite(this.photo.id);
    this.router.navigate(['/favorites']);
  }
}