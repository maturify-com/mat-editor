import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  onImageUpload: EventEmitter<any> = new EventEmitter<any>();
  afterImageUpload: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

}
