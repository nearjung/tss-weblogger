import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialModule } from '../../../material.module';
import { Race } from '../../../model/season-model';
@Component({
  selector: 'app-race',
  imports: [ FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MaterialModule, DatePipe],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss'
})
export class RaceComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  allRace: Race[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.allRace = [
      {
        raceMatchId: 1,
        eventId: 1,
        seasonId: 1,
        raceName: 'Thailand Super Pickup D2',
        raceSegment: 'pickup',
        raceSession: 'race5',
        raceClass: 'c',
        raceStart: new Date('6/9/2024 15:10:00'),
        raceEnd: new Date('6/9/2024 15:30:00'),
      }
    ];
    // this.loadEvent();
  }

  navigateToDashboard(raceId:number){
    this.router.navigate(['/pages', 'dashboard']);
  }

  openEdit(enterAnimationDuration: string, exitAnimationDuration: string, raceId: number): void {
    let arrayData = this.allRace.filter(x => x.raceMatchId == raceId);

    const dialogRef = this.dialog.open(DialogAnimationsModalEdit, {
      width: "100vw",
      maxWidth: "750px",
      enterAnimationDuration,
      exitAnimationDuration,
      data: {race_data: arrayData}
    });

    dialogRef.afterClosed().subscribe((updated: Race | undefined) => {
      if (!updated) return; // กดยกเลิก
      const idx = this.allRace.findIndex(e => e.raceMatchId === updated.raceMatchId);
      if (idx > -1) {
        this.allRace = [
          ...this.allRace.slice(0, idx),
          { ...this.allRace[idx], ...updated }, // merge field ที่แก้
          ...this.allRace.slice(idx + 1),
        ];
      }
    });
  }

  openRaceDelete(enterAnimationDuration: string, exitAnimationDuration: string, raceId: number): void {
    const dialogRef = this.dialog.open(DialogAnimationsRaceModalDelete, {
      width: "100vw",
      maxWidth: "350px",
      enterAnimationDuration,
      exitAnimationDuration,
      data: {race_id: raceId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.allRace = this.allRace.filter(e => e.raceMatchId !== result);
    });
  }
}


@Component({
  selector: 'dialog-animations-race-dialog',
  templateUrl: './modal-race/edit-race.html',
  styleUrl: './race.component.scss',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose,
    MatDialogTitle, MatDialogContent, MatTabsModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule,
    MatDatepickerModule, MatCheckboxModule, MatRadioModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsModalEdit implements OnInit {

  raceMatchId: number = 0;
  // seasonId: number = 0;
  // classValue: string = '';
  // sessionValue: string = '';
  // eventName: string = '';
  // segmentValue: string = '';
  raceName: string = '';
  eventList: any[] = [
    {
      value: 1,
      name:'TSS Bangsaen Grand Prix 2025'
    },
  ];

  seasonList: any[] = [
    {
      value: 1,
      name:'TSS The Super Series by B-Quik 2025'
    },
  ];

  sessionList: any[] = [
    {
      value:'Free Practice',
      name:'freepractice'
    },{
      value:'qualify',
      name:'Qualifying'
    },{
      value:'race1',
      name:'Race 1'
    },{
      value:'race2',
      name:'Race 2'
    },{
      value:'race3',
      name:'Race 3'
    },{
      value:'race4',
      name:'Race 4'
    },{
      value:'race5',
      name:'Race 5'
    }
  ];

  raceSegment: any[] = [
    {
      value: 'pickup',
      name:'Pickup'
    },{
      value: 'touring',
      name:'Touring'
    }
  ];

  classList: any[] = [
    {
      value: 'a',
      name:'Class A'
    },{
      value: 'b',
      name:'Class B'
    },{
      value: 'c',
      name:'Class C'
    },{
      value: 'ab',
      name:'Class A-B'
    },{
      value: 'overall',
      name:'Over All'
    },
  ];

  readonly dialogRef = inject(MatDialogRef<DialogAnimationsModalEdit>);
  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  readonly data:any = inject<Race>(MAT_DIALOG_DATA);

  readonly range = new FormGroup({
      start: new FormControl<Date>(this.data.race_data[0].raceStart),
      end: new FormControl<Date>(this.data.race_data[0].raceEnd),
  });

  eventId = new FormControl(this.data.race_data[0].eventId);
  seasonId = new FormControl(this.data.race_data[0].seasonId);
  classValue = new FormControl(this.data.race_data[0].raceClass);
  sessionValue = new FormControl(this.data.race_data[0].raceSession);
  eventName = new FormControl(this.data.race_data[0].eventId);
  segmentValue = new FormControl(this.data.race_data[0].raceSegment);

  ngOnInit() {
    console.log(this.data.race_data[0]);
    this.raceMatchId  = this.data.race_data[0].raceMatchId
    this.seasonId  = this.data.race_data[0].seasonId
    this.eventId = this.data.race_data[0].eventId;
    this.classValue = this.data.race_data[0].raceClass;
    this.sessionValue = this.data.race_data[0].raceSession;
    this.segmentValue = this.data.race_data[0].raceSegment;
    this.eventName = this.data.race_data[0].eventId;
    this.raceName = this.data.race_data[0].raceName;

    // this.dateSessionStart = this.data.race_data[0].eventStart;
    // this.dateSessionEnd = this.data.race_data[0].eventEnd;

    this._locale.set('fr');
    this._adapter.setLocale(this._locale());
    // this.updateCloseButtonLabel('Fermer le calendrier');


  }
  onSubmit(): void {
    let submit = {
      "raceMatchId": this.raceMatchId,
      "raceName": this.raceName,
      "eventId": this.eventId,
      "seasonId": this.seasonId,
      "raceSegment": this.raceSegment,
      "raceSession": this.sessionValue,
      "raceClass": this.classValue,
      "raceStart": this.range.controls.start.value,
      "raceEnd": this.range.controls.end.value,
    }
    this.dialogRef.close(submit);
  }
}

@Component({
  selector: 'dialog-animations-race-dialog',
  templateUrl: './modal-race/delete-race.html',
  styleUrl: './race.component.scss',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose,
    MatDialogTitle, MatTabsModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule,
    MatDatepickerModule, MatCheckboxModule, MatRadioModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsRaceModalDelete {
  raceMatchId: number = 0;

  readonly dialogRef = inject(MatDialogRef<DialogAnimationsRaceModalDelete>);
    readonly data:any = inject<Race>(MAT_DIALOG_DATA);
  ngOnInit() {
    console.log(this.data.race_id);
    this.raceMatchId = this.data.race_id;
  }

  onSubmit(): void {
    this.dialogRef.close(this.raceMatchId);
  }
}

