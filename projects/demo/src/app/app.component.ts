import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mat-Editor';


  ngOnInit(){
    document.getElementById("mat-editor").style.marginRight= "10%";
    document.getElementById("mat-editor").style.marginLeft= "10%";
  }
}