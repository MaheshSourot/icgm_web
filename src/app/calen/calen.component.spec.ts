import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenComponent } from './calen.component';

describe('CalenComponent', () => {
  let component: CalenComponent;
  let fixture: ComponentFixture<CalenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
