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

  items: any[] = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ]

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
  filterLogger = new FormControl<string[]>(['all'], { nonNullable: true });
  private wasAllSelected = this.filterLogger.value.includes('all');

  private _formBuilder = inject(FormBuilder);

  isChecked = true;
  formGroup = this._formBuilder.group({
    sortType: [true, Validators.requiredTrue],
  });

  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    // this.loadEvent();
    this.sortStatus = (this.formGroup.value.sortType)? 'มาก - น้อย':'น้อย - มาก';
  }

  // ช่วยให้ template เช็คได้สะดวก
  isAllSelected(): boolean {
    return this.filterLogger.value.includes('all');
  }
  // ถ้าเลือก "ทั้งหมด" พร้อมกับตัวอื่น ให้เหลือแค่ "ทั้งหมด"
  onSelectChange(event: MatSelectChange) {
    const values = (event.value || []) as string[];
    const hadAll = this.wasAllSelected;          // ก่อนหน้านี้
    const hasAllNow = values.includes('all');    // หลังเลือกครั้งนี้

    // ถ้ามี 'all' ร่วมกับตัวอื่น
    if (hasAllNow && values.length > 1) {
      if (hadAll) {
        // เคส: เลือก "ทั้งหมด" ค้างไว้ แล้วผู้ใช้เลือกตัวอื่น -> เอา "ทั้งหมด" ออก
        this.filterLogger.setValue(values.filter(v => v !== 'all'), { emitEvent: false });
      } else {
        // เคส: เดิมไม่มี "ทั้งหมด" แต่ผู้ใช้เลือก "ทั้งหมด" เพิ่ม -> เหลือแค่ "ทั้งหมด"
        this.filterLogger.setValue(['all'], { emitEvent: false });
      }
    }

    // อัปเดตสถานะก่อนหน้าไว้ใช้รอบถัดไป
    this.wasAllSelected = (this.filterLogger.value ?? values).includes('all');
  }
  onToggleSort(): void {
    this.sortStatus = (this.formGroup.value.sortType)? 'มาก - น้อย':'น้อย - มาก';
  }

  navigateToLoggerDetail() {
    this.router.navigate(['/pages', 'logger']);
    // this.router.navigate(['logger'], { relativeTo: this.route });
  }
}
