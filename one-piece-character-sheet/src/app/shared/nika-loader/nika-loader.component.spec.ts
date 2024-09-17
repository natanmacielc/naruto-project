import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NikaLoaderComponent } from './nika-loader.component';

describe('NikaLoaderComponent', () => {
  let component: NikaLoaderComponent;
  let fixture: ComponentFixture<NikaLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NikaLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NikaLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
