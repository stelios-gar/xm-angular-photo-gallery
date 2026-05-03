import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosPageComponent } from './photos-page.component';
import { PhotoCardComponent } from '../../../shared/components/photo-card/photo-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PhotosPageComponent', () => {
  let component: PhotosPageComponent;
  let fixture: ComponentFixture<PhotosPageComponent>;

  beforeEach(() => {
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
      ]
    });

    fixture = TestBed.createComponent(PhotosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});