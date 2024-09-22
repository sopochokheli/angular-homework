import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthButtonFieldComponent } from './auth-button-field.component';

describe('AuthButtonFieldComponent', () => {
  let component: AuthButtonFieldComponent;
  let fixture: ComponentFixture<AuthButtonFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthButtonFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthButtonFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
