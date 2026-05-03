import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoDetailPageComponent } from './photo-detail-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

describe('PhotoDetailPageComponent', () => {
  let component: PhotoDetailPageComponent;
  let fixture: ComponentFixture<PhotoDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule
      ],
      declarations: [PhotoDetailPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'photo-1'
              }
            }
          }
        }
      ]
    });

    fixture = TestBed.createComponent(PhotoDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});