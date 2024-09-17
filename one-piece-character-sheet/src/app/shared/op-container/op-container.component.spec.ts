import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpContainerComponent } from './op-container.component';

describe('OpContainerComponent', () => {
  let component: OpContainerComponent;
  let fixture: ComponentFixture<OpContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
