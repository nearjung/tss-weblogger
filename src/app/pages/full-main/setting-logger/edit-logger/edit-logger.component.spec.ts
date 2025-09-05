import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoggerComponent } from './edit-logger.component';

describe('EditLoggerComponent', () => {
  let component: EditLoggerComponent;
  let fixture: ComponentFixture<EditLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLoggerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
