import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css']
})
export class PlotsComponent implements OnInit {
  title: string |  undefined;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;
  }

}
