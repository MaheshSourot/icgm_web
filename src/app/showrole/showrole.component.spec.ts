import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowroleComponent } from './showrole.component';

describe('ShowroleComponent', () => {
  let component: ShowroleComponent;
  let fixture: ComponentFixture<ShowroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowroleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
