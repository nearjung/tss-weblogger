import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatActionList } from '@angular/material/list';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-full-main',
  imports: [MatToolbarModule, MatIcon, MatDrawerContainer, MatDrawer, MatActionList, RouterOutlet, MaterialModule],
  templateUrl: './full-main.component.html',
  styleUrl: './full-main.component.scss'
})
export class FullMainComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    // this.loadEvent();
  }

  navigateToDashboard() {
    this.router.navigate(['/pages', 'dashboard']);
  }

  navigateToListAllSeason() {
    this.router.navigate(['/pages', 'season']);
  }

  navigateToAddSeason() {
    this.router.navigate(['/pages', 'add-event']);
  }
}
