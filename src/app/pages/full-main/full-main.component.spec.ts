import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMainComponent } from './full-main.component';

describe('FullMainComponent', () => {
  let component: FullMainComponent;
  let fixture: ComponentFixture<FullMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
