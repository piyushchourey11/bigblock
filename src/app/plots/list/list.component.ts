import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class PlotListComponent implements OnInit {
  title: any;
  list:Array<{id:number,name:string,state:string,city:string,status:string}> = Array();
  plotlist:any=[];
  selectedPlot:any;
  constructor(private route: ActivatedRoute, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;
    this.list.push({id:1,name:'it001',state:'Sam',city:'Sam',status:'Registered'},{id:1,name:'it001',state:'Sam',city:'Sam',status:'Registered'});
    console.log(this.list);
  }
  getplotlist() {
    this.api.fetchData('plotlist', {}, "Get").subscribe((res:any) => {
      if(res['status'] == 1) {
        this.plotlist = res['data'];
      }else {
        this.plotlist =[]
      }
    })
  }

  viewPlotlist(id:any) {

  }

  deletePlotlist(id:any) {
      this.api.deleteData('plotlist/'+id, {}, "Get").subscribe((res:any) => {
        if(res['status'] == 1) {
          // this.plotlist = res['data'];
          this.getplotlist()
          this.api.showNotification('success','Plotlist deleted successfully.')
        }else {
          // this.plotlist
          this.api.showNotification('error',res['message'])
        }
      })
    
  }

  editPlotlist(id:any) {
    let url = 'plots/view/'+id;
    this.router.navigate([url]);
  }


}
