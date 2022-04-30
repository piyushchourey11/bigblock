import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  title: string | undefined;
  list:Array<{id:number,name:string,state:string,city:string,status:string}> = Array();
  reportList:any =[];
  selectedreport:any;
  constructor(private route: ActivatedRoute, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;
    this.list.push({id:1,name:'it001',state:'Sam',city:'Sam',status:'Registered'},{id:2,name:'it001',state:'Sam',city:'Sam',status:'Pending'});
    console.log(this.list);
    this.getreportList()
    
  }
  getreportList() {
    this.api.fetchData('reportList', {}, "Get").subscribe((res:any) => {
      if(res['status'] == 1) {
        this.reportList = res['data'];
      }else {
        this.reportList =[]
      }
    })
  }

  viewreportList(id:any) {

  }

  deletereportList(id:any) {
      this.api.deleteData('reportList/'+id, {}, "Get").subscribe((res:any) => {
        if(res['status'] == 1) {
          // this.reportList = res['data'];
          this.getreportList()
          this.api.showNotification('success','reportList deleted successfully.')
        }else {
          // this.reportList
          this.api.showNotification('error',res['message'])
        }
      })
    
  }

  // editreportList(id:any) {
  //   let url = 'plots/view/'+id;
  //   this.router.navigate([url]);
  // }


}
