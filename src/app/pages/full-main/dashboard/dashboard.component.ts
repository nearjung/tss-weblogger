import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { LoggerModel } from '../../../model/season-model';
import { ResetWarningLoggerComponent } from './reset-warning-logger/reset-warning-logger.component';
import { MatDialog } from '@angular/material/dialog';

type FilterKey = 'all' | 'allWarning' | 'allSmokeDetect';
@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule
    , MatIconModule ,MatBadgeModule, MatButtonModule, MatToolbarModule
    , FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule
    , MatSlideToggleModule, MatMenuModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

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
      id: 4,
      matchId: 2,
      driverName: "วิทวัส Drift",
      carNumber: "88",
      carType: "SUV",
      loggerId: "Client126",
      numberWarning: 4,
      warningDetector: true,
    },
    {
      id: 5,
      matchId: 2,
      driverName: "Napat Racer",
      carNumber: "19",
      carType: "Coupe",
      loggerId: "Client127",
      numberWarning: 0,
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
      id: 7,
      matchId: 3,
      driverName: "ธนา Power",
      carNumber: "63",
      carType: "Sedan",
      loggerId: "Client129",
      numberWarning: 0,
      warningDetector: false,
    },
    {
      id: 8,
      matchId: 3,
      driverName: "Chanin Boost",
      carNumber: "42",
      carType: "Hatchback",
      loggerId: "Client130",
      numberWarning: 1,
      warningDetector: false,
    },
    {
      id: 9,
      matchId: 2,
      driverName: "มุกดา Grip",
      carNumber: "71",
      carType: "SUV",
      loggerId: "Client131",
      numberWarning: 0,
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
    },
    {
      id: 11,
      matchId: 2,
      driverName: "ศศิ Nitro",
      carNumber: "33",
      carType: "Pickup",
      loggerId: "Client133",
      numberWarning: 2,
      warningDetector: false,
    },
    {
      id: 12,
      matchId: 3,
      driverName: "Bosco Line",
      carNumber: "7",
      carType: "Sedan",
      loggerId: "Client134",
      numberWarning: 0,
      warningDetector: false,
    },
  ];

  readonly dialog = inject(MatDialog);
  onShowAllLoggers: LoggerModel[] = []


  sortStatus:string = '';
  showRoutePath: boolean = true;
  filterLogList: any[] = [
    {
      name: 'Logger ทั้งหมด',
      value: 'all'
    },{
      name: 'เฉพาะ ควันคำ',
      value: 'allSmokeDetect'
    },{
      name: 'เฉพาะ Warning',
      value: 'allWarning'
    }
  ];
  filterLogger = new FormControl<FilterKey[]>(['all'], { nonNullable: true });
  private wasAllSelected = this.filterLogger.value.includes('all');
  private _formBuilder = inject(FormBuilder);
  filterIsAnd = false;
  isChecked = true;
  formGroup = this._formBuilder.group({
    sortType: [true, Validators.requiredTrue],
  });

  constructor(private router: Router, private route: ActivatedRoute) {
    this.allLoggers = this.allLoggers.filter(x => x.matchId == 1);
  }
  ngOnInit() {
    // this.loadEvent();

    this.sortStatus = (this.formGroup.value.sortType)? 'มาก - น้อย':'น้อย - มาก';
    this.updateView();
    // ถ้าอยากอัปเดตอัตโนมัติเมื่อฟอร์มเปลี่ยนค่า:
    this.filterLogger.valueChanges.subscribe(() => this.updateView());
  }

  isAllSelected(): boolean {
    return this.filterLogger.value.includes('all');
  }

  private matchesFilters(item: LoggerModel, filters: FilterKey[]): boolean {
    if (filters.length === 0 || filters.includes('all')) return true;

    const conds: any[] = [];
    if (filters.includes('allWarning')) conds.push(item.numberWarning > 0 && !item.warningDetector);
    if (filters.includes('allSmokeDetect')) conds.push(item.warningDetector === true);

    return this.filterIsAnd ? conds.every(Boolean) : conds.some(Boolean);
  }

  private updateView(): void {
    const filters = this.filterLogger.value ?? ['all'];

    // 1) FILTER
    let filtered = this.allLoggers.filter(x => this.matchesFilters(x, filters));

    filtered.sort((a, b) => {
      // ทิศทางเรียงจากฟอร์ม: true = มาก→น้อย, false = น้อย→มาก
      const desc = !!this.formGroup.value.sortType;

      // 1) เรียงตามจำนวน warning ก่อน (เป็นคีย์หลัก)
      const byWarning = desc
        ? b.numberWarning - a.numberWarning   // มาก→น้อย
        : a.numberWarning - b.numberWarning;  // น้อย→มาก
      if (byWarning !== 0) return byWarning;

      // 2) tie-breaker: ให้ warningDetector=true มาก่อน (เฉพาะตอนจำนวนเท่ากัน)
      const byDetector = Number(b.warningDetector) - Number(a.warningDetector);
      if (byDetector !== 0) return byDetector;

      // 3) tie-breaker สุดท้าย: ชื่อคนขับ (โลแคลไทย)
      return a.driverName.localeCompare(b.driverName, 'th');
    });

    this.onShowAllLoggers = filtered;
  }

  // ถ้าเลือก "ทั้งหมด" พร้อมกับตัวอื่น ให้เหลือแค่ "ทั้งหมด"
  onSelectChange(event: MatSelectChange) {
    const values = (event.value || []) as FilterKey[];
    const hadAll = this.wasAllSelected;
    const hasAllNow = values.includes('all');

    if (hasAllNow && values.length > 1) {
      if (hadAll) {
        this.filterLogger.setValue(values.filter(v => v !== 'all'), { emitEvent: false });
      } else {
        this.filterLogger.setValue(['all'], { emitEvent: false });
      }
    }else if(values.length == 0){
      this.filterLogger.setValue(['all'], { emitEvent: false });
    }

    this.wasAllSelected = (this.filterLogger.value ?? values).includes('all');

    // อัปเดตผลทุกครั้งหลังเปลี่ยน
    this.updateView();
  }

  get allWarning(): LoggerModel[] {
    return this.allLoggers.filter(x => x.numberWarning > 0);
  }

  onToggleSort(): void {
    const desc = !!this.formGroup.value.sortType; // true = มาก - น้อย
    this.sortStatus = desc ? 'มาก - น้อย' : 'น้อย - มาก';
    this.updateView(); // 👉 เรียงใหม่ตามสถานะล่าสุด
  }

  navigateToLoggerDetail() {
    this.router.navigate(['/pages', 'logger']);
    // this.router.navigate(['logger'], { relativeTo: this.route });
  }

  navigateToResetLogger(enterAnimationDuration: string, exitAnimationDuration: string): void {
       const dialogRef = this.dialog.open(ResetWarningLoggerComponent, {
      enterAnimationDuration, exitAnimationDuration,
    });
  }
}
