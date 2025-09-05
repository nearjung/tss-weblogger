import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from './add-event/add-event.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatActionList } from '@angular/material/list';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-full-main',
  standalone: true,
  templateUrl: './full-main.component.html',
  styleUrl: './full-main.component.scss',
  imports: [
    MatToolbarModule, MatIcon, MatDrawerContainer, MatDrawer, MatActionList, MaterialModule,
    RouterOutlet, MatButtonModule,
    AsyncPipe,
  ],
})
export class FullMainComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  /** true เฉพาะเมื่อ URL เริ่มด้วย /pages/dashboard */
  isDashboard$: Observable<boolean>;

  constructor(private router: Router) {
    this.isDashboard$ = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      startWith({ url: this.router.url } as NavigationEnd),        // ให้มีค่าเริ่มต้นตอนโหลดครั้งแรก
      map(() => this.router.url.startsWith('/pages/dashboard'))    // หรือจะใช้ regex ก็ได้
    );
  }

  ngOnInit() {}

  navigateToDashboard() { this.router.navigate(['/pages', 'dashboard']); }
  navigateToListAllSeason() { this.router.navigate(['/pages', 'season']); }
  navigateToListSettingLogger() { this.router.navigate(['/pages', 'setting-logger']); }

  navigateToAddSeason(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddEventComponent, {
      width: '100vw', maxWidth: '750px',
      enterAnimationDuration, exitAnimationDuration,
    });
  }
}
