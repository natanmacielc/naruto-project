import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchHistoryComponent } from './catch-history.component';

describe('CatchHistoryComponent', () => {
  let component: CatchHistoryComponent;
  let fixture: ComponentFixture<CatchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
