import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyViewerComponent } from './technology-viewer.component';

describe('TechnologyViewerComponent', () => {
  let component: TechnologyViewerComponent;
  let fixture: ComponentFixture<TechnologyViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
