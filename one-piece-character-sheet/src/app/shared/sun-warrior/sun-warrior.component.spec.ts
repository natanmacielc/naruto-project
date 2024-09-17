import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunWarriorComponent } from './sun-warrior.component';

describe('SunComponent', () => {
  let component: SunWarriorComponent;
  let fixture: ComponentFixture<SunWarriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunWarriorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunWarriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
