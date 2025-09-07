import { ChangeDetectionStrategy, Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogLoggerData } from '../setting-logger.component';

@Component({
  selector: 'app-delete-logger',
  imports: [MatButtonModule, MatDialogClose, MatDialogContent,
    MatDialogTitle, FormsModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './delete-logger.component.html',
  styleUrl: './delete-logger.component.scss'
})
export class DeleteLoggerComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<DeleteLoggerComponent>);
  readonly data = inject<DialogLoggerData>(MAT_DIALOG_DATA);
  logger_id = this.data.loggerId;

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    console.log(this.logger_id)
  }
}
