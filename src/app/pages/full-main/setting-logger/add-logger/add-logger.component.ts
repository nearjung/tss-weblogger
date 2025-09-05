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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-logger',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose,
    MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-logger.component.html',
  styleUrl: './add-logger.component.scss'
})
export class AddLoggerComponent implements OnInit {

  ngOnInit() {

  }

}
