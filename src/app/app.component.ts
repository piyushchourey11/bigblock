import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogin : boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.isLogin = true;
      this.document.body.classList.add('sidebar-mini');
    }else{
      this.document.body.classList.add('login-page');
    }
    
  }
}
