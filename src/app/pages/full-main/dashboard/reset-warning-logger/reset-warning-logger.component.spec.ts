import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetWarningLoggerComponent } from './reset-warning-logger.component';

describe('ResetWarningLoggerComponent', () => {
  let component: ResetWarningLoggerComponent;
  let fixture: ComponentFixture<ResetWarningLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetWarningLoggerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetWarningLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
