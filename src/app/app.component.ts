import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogin : boolean = false;
  path!: string;
  title:any;
  constructor(@Inject(DOCUMENT) private document: Document,private router : Router,private route: ActivatedRoute,) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const path = window.location.pathname.split('/').join(' ').trim();
      
        // document.body.className = (path) ? path : 'login';
        const currentPage = (path) ? path : 'login';
        const currentPageParts = currentPage.split(' ');
        this.path = currentPageParts[currentPageParts.length - 1];
       
        
      }
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.isLogin = true;
      this.document.body.classList.add('sidebar-mini');
    }else{
      this.document.body.classList.add('login-page');
    }
    
  }
}
