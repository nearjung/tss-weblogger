import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLoggerComponent } from './setting-logger.component';

describe('SettingLoggerComponent', () => {
  let component: SettingLoggerComponent;
  let fixture: ComponentFixture<SettingLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingLoggerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
