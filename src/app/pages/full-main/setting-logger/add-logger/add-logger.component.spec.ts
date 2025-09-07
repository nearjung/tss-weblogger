import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoggerComponent } from './add-logger.component';

describe('AddLoggerComponent', () => {
  let component: AddLoggerComponent;
  let fixture: ComponentFixture<AddLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLoggerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
