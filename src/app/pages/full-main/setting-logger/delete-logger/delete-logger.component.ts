import { ChangeDetectionStrategy, Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-logger',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose,
    MatDialogTitle, MatDialogContent, FormsModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './delete-logger.component.html',
  styleUrl: './delete-logger.component.scss'
})
export class DeleteLoggerComponent implements OnInit {

  ngOnInit() {

  }

}
