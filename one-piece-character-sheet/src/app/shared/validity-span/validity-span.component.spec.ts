import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiditySpanComponent } from './validity-span.component';

describe('ValiditySpanComponent', () => {
  let component: ValiditySpanComponent;
  let fixture: ComponentFixture<ValiditySpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValiditySpanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiditySpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
