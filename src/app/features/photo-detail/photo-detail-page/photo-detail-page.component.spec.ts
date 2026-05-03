import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetailPageComponent } from './photo-detail-page.component';

describe('PhotoDetailPageComponent', () => {
  let component: PhotoDetailPageComponent;
  let fixture: ComponentFixture<PhotoDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoDetailPageComponent]
    });
    fixture = TestBed.createComponent(PhotoDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
