import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mat-Editor';

  editorConfig = {
    editable: true,
    spellcheck: false,
    showToolbar: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Type text',
    translate: 'no',
    videoEndPoint: 'heuy',
    imageEndPoint: 'hey',
    toolbar: []
  };

  ngOnInit() {
    document.getElementById("mat-editor").style.marginRight = "10%";
    document.getElementById("mat-editor").style.marginLeft = "10%";
  }
}
