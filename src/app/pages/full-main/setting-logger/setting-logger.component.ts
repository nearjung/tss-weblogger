import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { AddLoggerComponent } from './add-logger/add-logger.component';
import { EditLoggerComponent } from './edit-logger/edit-logger.component';
import { DeleteLoggerComponent } from './delete-logger/delete-logger.component';

@Component({
  selector: 'app-setting-logger',
  imports: [MatCardModule,MatMenuModule, MatSelectModule
    , MatButtonModule, MatIconModule],
  templateUrl: './setting-logger.component.html',
  styleUrl: './setting-logger.component.scss'
})
export class SettingLoggerComponent implements OnInit {
  readonly dialog = inject(MatDialog);

    items: any[] = [
    1,
    1,
  ]


  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    // this.loadEvent();
  }

  addLogger(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddLoggerComponent, {
      width: '100vw', maxWidth: '750px',
      enterAnimationDuration, exitAnimationDuration,
    });
  }

  settingLogger(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditLoggerComponent, {
      width: '100vw', maxWidth: '350px',
      enterAnimationDuration, exitAnimationDuration,
    });
  }

  deleteLogger(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteLoggerComponent, {
      width: '100vw', maxWidth: '150px',
      enterAnimationDuration, exitAnimationDuration,
    });
  }
}
