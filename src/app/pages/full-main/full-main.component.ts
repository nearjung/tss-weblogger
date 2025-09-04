import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatActionList } from '@angular/material/list';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from './add-event/add-event.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-full-main',
  templateUrl: './full-main.component.html',
  styleUrl: './full-main.component.scss',
  imports: [MatToolbarModule, MatIcon, MatDrawerContainer, MatDrawer, MatActionList, RouterOutlet, MaterialModule, MatButtonModule],

})
export class FullMainComponent implements OnInit {
  readonly dialog = inject(MatDialog);
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


  navigateToAddSeason(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddEventComponent
      , {
      width: '760px',
      enterAnimationDuration,
      exitAnimationDuration,
    }
  );
    // this.router.navigate(['/pages', 'add-event']);
  }
}
