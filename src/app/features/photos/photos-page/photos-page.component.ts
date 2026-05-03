import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotoService } from '../../../core/services/photo.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Photo } from '../../../shared/models/photo';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent implements OnInit {
  photos: Photo[] = [];
  loading = false;

  private readonly photosPerLoad = 12;

  constructor(
    private photoService: PhotoService,
    private favoritesService: FavoritesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;
  const threshold = 400;

    if (scrollPosition >= pageHeight - threshold) {
      this.loadPhotos();
    }
  }

  loadPhotos(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.photoService.getPhotos(this.photosPerLoad).subscribe({
      next: photos => {
        this.photos = [...this.photos, ...photos];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  addToFavorites(photo: Photo): void {
    const alreadyFavorite = this.favoritesService.isFavorite(photo.id);

    this.favoritesService.addFavorite(photo);

    this.snackBar.open(
      alreadyFavorite ? 'Photo is already in favorites' : 'Photo added to favorites',
      'Close',
      { duration: 2000 }
    );
  }
}