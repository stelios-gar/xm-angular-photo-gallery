import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoCardComponent } from './photo-card.component';
import { MatCardModule } from '@angular/material/card';

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent;
  let fixture: ComponentFixture<PhotoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [PhotoCardComponent]
    });

    fixture = TestBed.createComponent(PhotoCardComponent);
    component = fixture.componentInstance;

    component.photo = {
      id: 'photo-1',
      url: 'https://picsum.photos/seed/photo-1/200/300',
      detailUrl: 'https://picsum.photos/seed/photo-1/600/800'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});