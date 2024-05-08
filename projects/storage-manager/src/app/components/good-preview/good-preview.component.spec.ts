import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodPreviewComponent } from './good-preview.component';

describe('GoodPreviewComponent', () => {
  let component: GoodPreviewComponent;
  let fixture: ComponentFixture<GoodPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
