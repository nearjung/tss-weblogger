import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, Match } from '../../../service/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-season',
  imports: [],
  templateUrl: './season.component.html',
  styleUrl: './season.component.scss'
})
export class SeasonComponent implements OnInit {
  allSeason: any[] = [];
  matchList: Match[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService) {
  }

  ngOnInit() {
    this.allSeason = [
      {
        seasonId: 1,
        seasonName: 'TSS The Super Series by B-Quik 2025',
      }
    ]
    // this.loadMatch();
  }

  navigateToEvent(){
    this.router.navigate(['/pages', 'event']);
  }


  private loadMatch(): void {
    const MatchSub = this.eventService.getMatch().subscribe(
      matchList => {
        this.matchList = matchList;
      },
      error => {
        console.error('Error loading matchList:', error);
        // Fallback to mock data if API fails
        // this.matchList = this.eventService.getMatchSync();
      }
    );
    this.subscriptions.push(MatchSub);
  }
}
