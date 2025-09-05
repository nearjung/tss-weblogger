import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-season',
  imports: [],
  templateUrl: './season.component.html',
  styleUrl: './season.component.scss'
})
export class SeasonComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute
    ,private http: HttpClient) {
  }

  ngOnInit() {
    // this.loadEvent();
  }

  navigateToEvent(){
    this.router.navigate(['/pages', 'event']);
  }

}
