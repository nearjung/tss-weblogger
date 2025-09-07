import { ChangeDetectionStrategy, Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogLoggerData } from '../setting-logger.component';

@Component({
  selector: 'app-edit-logger',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose,
    MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-logger.component.html',
  styleUrl: './edit-logger.component.scss'
})
export class EditLoggerComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditLoggerComponent>);
  readonly data = inject<DialogLoggerData>(MAT_DIALOG_DATA);
  car_number = this.data.carNumber;
  logger_id = this.data.loggerId;
  name = this.data.name;

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
