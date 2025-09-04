import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-race',
  imports: [ FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss'
})
export class RaceComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    // this.loadEvent();
  }

  navigateToDashboard(){
    this.router.navigate(['/pages', 'dashboard']);
  }

  // navigateToInsertOrUpdate(){
  //   this.router.navigate(['/pages', 'logger/add-logger']);
  // }
}
