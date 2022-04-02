import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class PlotListComponent implements OnInit {
  title: any;
  list:Array<{name:string,state:string,city:string,status:string}> = Array();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;
    this.list.push({name:'it001',state:'Sam',city:'Sam',status:'Registered'},{name:'it001',state:'Sam',city:'Sam',status:'Registered'});
    console.log(this.list);
  }

}
