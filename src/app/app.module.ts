import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotosPageComponent } from './features/photos/photos-page/photos-page.component';
import { FavoritesPageComponent } from './features/favorites/favorites-page/favorites-page.component';
import { PhotoDetailPageComponent } from './features/photo-detail/photo-detail-page/photo-detail-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PhotoCardComponent } from './shared/components/photo-card/photo-card.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosPageComponent,
    FavoritesPageComponent,
    PhotoDetailPageComponent,
    HeaderComponent,
    PhotoCardComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
