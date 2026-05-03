/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoCardComponent } from './photo-card.component';
import { MatCardModule } from '@angular/material/card';
import { Photo } from '../../models/photo';

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent;
  let fixture: ComponentFixture<PhotoCardComponent>;

  const photo: Photo = {
    id: 'photo-1',
    url: 'https://picsum.photos/seed/photo-1/200/300',
    detailUrl: 'https://picsum.photos/seed/photo-1/600/800'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [PhotoCardComponent]
    });

    fixture = TestBed.createComponent(PhotoCardComponent);
    component = fixture.componentInstance;
    component.photo = photo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the photo image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const image = compiled.querySelector('img') as HTMLImageElement;

    expect(image).toBeTruthy();
    expect(image.src).toContain(photo.url);
    expect(image.alt).toBe(photo.id);
  });

  it('should emit photoClick when photo is clicked', () => {
    spyOn(component.photoClick, 'emit');

    component.onPhotoClick();

    expect(component.photoClick.emit).toHaveBeenCalledWith(photo);
  });
});