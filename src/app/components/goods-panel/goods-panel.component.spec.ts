import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsPanelComponent } from './goods-panel.component';

describe('GoodsPanelComponent', () => {
  let component: GoodsPanelComponent;
  let fixture: ComponentFixture<GoodsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
