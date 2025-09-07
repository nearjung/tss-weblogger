import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLoggerComponent } from './delete-logger.component';

describe('DeleteLoggerComponent', () => {
  let component: DeleteLoggerComponent;
  let fixture: ComponentFixture<DeleteLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLoggerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
