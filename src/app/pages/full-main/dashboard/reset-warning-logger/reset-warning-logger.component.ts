import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-reset-warning-logger',
  templateUrl: './reset-warning-logger.component.html',
  styleUrl: './reset-warning-logger.component.scss',
  imports: [MatButtonModule, MatDialogClose,
    MatDialogContent, MatDialogTitle, FormsModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetWarningLoggerComponent implements OnInit {

  ngOnInit() {

  }

}
