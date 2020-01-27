import { Component, OnInit } from '@angular/core';
import { MatEditorModule } from 'mat-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mat-Editor';
  count = 1; // Count variable is used to demo the function 'uploadImage'
  editorConfig = {
    editable: true,
    spellcheck: false,
    showToolbar: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Type text',
    translate: 'no',
    videoEndPoint: 'Add the video upload endpoint (directly called through the mat-editor)',
    imageEndPoint: 'Add the image upload endpoint (directly called through the mat-editor)',
    toolbar: []
  };

  public imageURL: string;

  ngOnInit() {
    document.getElementById('mat-editor').style.marginRight = '10%';
    document.getElementById('mat-editor').style.marginLeft = '10%';
  }

  public uploadImage(event): void {
    console.log(event);
    // This fuction can be used to upload images through the Angular app, which is integrated with the mat-editor

    /* Capture the image from the event, upload it to an object storage container and then set the Image url of the
    relevant image. The below links were added for the demo */
    this.imageURL = 'https://files.startupranking.com/startup/thumb/552402_e627875ed7855d62ffa001518202a6d0612805f4_maturify_m.jpeg';
    if (this.count % 2 === 1) {
      this.imageURL = 'https://i.ytimg.com/vi/jcnXU5dkD0c/maxresdefault.jpg';
    } else {
      this.imageURL = 'https://files.startupranking.com/startup/thumb/552402_e627875ed7855d62ffa001518202a6d0612805f4_maturify_m.jpeg';
    }
    this.count++;
  }
}
