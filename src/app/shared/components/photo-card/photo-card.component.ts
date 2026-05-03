import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent {
  @Input() photo!: Photo;
  @Output() photoClick = new EventEmitter<Photo>();

  onPhotoClick(): void {
    this.photoClick.emit(this.photo);
  }
}