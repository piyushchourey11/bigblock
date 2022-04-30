import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  title: string | undefined;
  list:Array<{id:number,name:string,state:string,city:string,status:string}> = Array();
  townshiplist:any = [];
  selectedTownship:any;
  constructor(private route: ActivatedRoute,private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;
    this.list.push({id:1,name:'it001',state:'Sam',city:'Sam',status:'Registered'},{id:2,name:'it001',state:'Sam',city:'Sam',status:'Registered'});
    console.log(this.list);
  }
  getTownshipList() {
    this.api.fetchData('townshiplist', {}, "Get").subscribe((res:any) => {
      if(res['status'] == 1) {
        this.townshiplist = res['data'];
      }else {
        this.townshiplist
      }
    })
  }

  viewTownShip(id:any) {

  }

  deleteTownship(id:any) {
      this.api.deleteData('townshiplist/'+id, {}, "Get").subscribe((res:any) => {
        if(res['status'] == 1) {
          // this.townshiplist = res['data'];
          this.getTownshipList()
          this.api.showNotification('success','Township deleted successfully.')
        }else {
          // this.townshiplist
          this.api.showNotification('error',res['message'])
        }
      })
    
  }

  editTownShip(id:any) {
    let url = 'township/view/'+id;
    this.router.navigate([url]);
  }


}
