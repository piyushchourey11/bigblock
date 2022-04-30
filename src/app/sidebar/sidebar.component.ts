import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AuthenticationService } from '../_services';
import { sidebar_menu } from '../_helpers/sidebarmenue';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebar_menu = sidebar_menu
  constructor(private api: ApiService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    
  }

  checkRole(role:any) {
    const currentUser = this.authenticationService.currentUserValue;
    if(Object.keys(currentUser).length ) {
      let x = role.findIndex((f:any) => f == currentUser.role)

      return x != -1 ? true: false
    }else{
      return false
    }
  }

}
