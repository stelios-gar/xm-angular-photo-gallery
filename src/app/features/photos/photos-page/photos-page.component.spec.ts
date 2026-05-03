import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosPageComponent } from './photos-page.component';

describe('PhotosPageComponent', () => {
  let component: PhotosPageComponent;
  let fixture: ComponentFixture<PhotosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosPageComponent]
    });
    fixture = TestBed.createComponent(PhotosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
