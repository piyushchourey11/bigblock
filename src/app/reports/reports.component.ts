import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  title: string | undefined;
  list:Array<{name:string,state:string,city:string,status:string}> = Array();
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;
    this.list.push({name:'it001',state:'Sam',city:'Sam',status:'Registered'},{name:'it001',state:'Sam',city:'Sam',status:'Pending'});
    console.log(this.list);
    
  }

}
