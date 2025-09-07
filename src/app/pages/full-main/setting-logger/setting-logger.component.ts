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
import { LoggerModel } from '../../../model/season-model';

export interface DialogLoggerData {
  loggerId: string;
  carNumber: string;
  name: string;
}

@Component({
  selector: 'app-setting-logger',
  imports: [MatCardModule,MatMenuModule, MatSelectModule
    , MatButtonModule, MatIconModule],
  templateUrl: './setting-logger.component.html',
  styleUrl: './setting-logger.component.scss'
})
export class SettingLoggerComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  allLoggers: LoggerModel[] = [
    {
      id: 1,
      matchId: 1,
      driverName: "ทดสอบ Test01",
      carNumber: "3",
      carType: "Pickup",
      loggerId: "Client123",
      numberWarning: 0,
      warningDetector: false,
    },
    {
      id: 2,
      matchId: 1,
      driverName: "สมชาย Speed",
      carNumber: "12",
      carType: "Sedan",
      loggerId: "Client124",
      numberWarning: 2,
      warningDetector: false,
    },
    {
      id: 3,
      matchId: 1,
      driverName: "Arisa Turbo",
      carNumber: "27",
      carType: "Hatchback",
      loggerId: "Client125",
      numberWarning: 1,
      warningDetector: false,
    },
    {
      id: 6,
      matchId: 1,
      driverName: "Ploy Fast",
      carNumber: "05",
      carType: "Pickup",
      loggerId: "Client128",
      numberWarning: 3,
      warningDetector: false,
    },
    {
      id: 10,
      matchId: 1,
      driverName: "Krit Aero",
      carNumber: "09",
      carType: "Coupe",
      loggerId: "Client132",
      numberWarning: 5,
      warningDetector: true,
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    // this.loadEvent();
  }

  addLogger(enterAnimationDuration: string, exitAnimationDuration: string): void {
       const dialogRef = this.dialog.open(AddLoggerComponent, {
      width: '100vw', maxWidth: '750px',
      enterAnimationDuration, exitAnimationDuration,
    });
  }

  settingLogger(enterAnimationDuration: string, exitAnimationDuration: string, loggerId:any): void {
    let arrayData = this.allLoggers.filter(x => x.loggerId == loggerId);
       const dialogRef = this.dialog.open(EditLoggerComponent, {
      width: '100vw', maxWidth: '350px',
      enterAnimationDuration, exitAnimationDuration,
        data: {name: arrayData[0].driverName, carNumber: arrayData[0].carNumber, loggerId: arrayData[0].loggerId},
      });
  }

  deleteLogger(enterAnimationDuration: string, exitAnimationDuration: string, loggerId:any): void {
    let arrayData = this.allLoggers.filter(x => x.loggerId == loggerId);
       const dialogRef = this.dialog.open(DeleteLoggerComponent, {
      width: '100vw', maxWidth: '150px',
      enterAnimationDuration, exitAnimationDuration,
        data: {loggerId: arrayData[0].loggerId},
    });
  }
}

