import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  title: string | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;
 }

}
