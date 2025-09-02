import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event',
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    // this.loadEvent();
  }

  navigateToDashboardList(){
    this.router.navigate(['/dashboard']);
  }

  navigateToEventList(){
    this.router.navigate(['/event']);
  }

  navigateToLoggerList(){
    this.router.navigate(['/logger']);
  }


  navigateToRaceList(){
    this.router.navigate(['/race']);
  }

}
