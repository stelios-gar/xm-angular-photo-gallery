import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosPageComponent } from './features/photos/photos-page/photos-page.component';
import { FavoritesPageComponent } from './features/favorites/favorites-page/favorites-page.component';
import { PhotoDetailPageComponent } from './features/photo-detail/photo-detail-page/photo-detail-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'photos', pathMatch: 'full' },
  { path: 'photos', component: PhotosPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: 'photos/:id', component: PhotoDetailPageComponent },
  { path: '**', redirectTo: 'photos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
