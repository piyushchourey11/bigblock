import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,  Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bardata:any;
  graph:any;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    defaultColor:'rgb(0, 123, 255)'
  };
  barChartLabels: Label[] = ['jan', 'fab', 'march', 'april', 'may','jun','july','aug','sept'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [0,2,4,1,3,11,15,17,4], label: 'Booking' },
    // { data: [2800, 4800, 4000, 7900, 9600, 8870, 1400], label: 'Company B' }
  ];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Booked', 'New', 'Resale', 'Sold'];
  public pieChartData: SingleDataSet = [300, 500, 100,200];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  piechart: any;
  townshiplist: any;



  constructor(@Inject(DOCUMENT) private document: Document,
  private route: ActivatedRoute,
  private router: Router, 
  private api : ApiService, private fb: FormBuilder) {
    this.getbardata()
    this.getGraph()
    this.getPieChartData("");
    this.getTownshipList();
  }

  ngOnInit(): void {
    //this.document.body.classList.add('test');
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  getTownshipList() {
    this.api.fetchData('township/getAll', {}, "Get").subscribe((res:any) => {
      if(res && res.status == 1) {
          this.townshiplist = res['data'];
        }else {
        this.townshiplist =[];
      }
    })
  }

  onchangeTownship(event:any){
    this.piechart = undefined;
    this.getPieChartData(event.target.value);
  }
  
  getbardata() {
    this.api.fetchData('report/getDashboardWidgetData', {}, "GET").subscribe((res:any) => {
      if(res['status'] == 1) {
        this.bardata = res['data'];


      }else {
      }
    })
  }

  getGraph() {
    this.api.fetchData('report/getDashboardReportChart', {}, "GET").subscribe((res:any) => {
      if(res['status'] == 1) {
        this.graph = res['data'];
        this.barChartData[0].data = this.graph[0].data
        this.barChartData[0].label = this.graph[0].label
        this.barChartLabels = this.graph[0].lable
        // this.barChartData[0].data =this.graph[0].year
        // this.barChartData[0] =this.graph[0].['Month Name']

      }else {
        this.graph = []
      }
    })
  }

  getPieChartData(township_id:any){
    let paramObj:any = {};
    if(township_id){
      paramObj['townshipId'] = township_id;
    }
    this.api.fetchData('report/getPieChartData', paramObj, "GET").subscribe((res:any) => {
      if(res['status'] == 1) {
        this.piechart = res['data'];
        this.pieChartData = this.piechart[0].data
        this.pieChartLabels = this.piechart[0].lable
      }else {
        this.piechart = []
      }
    })
  }

}
