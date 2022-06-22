import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodQuickInteractionComponent } from './method-quick-interaction.component';

describe('MethodQuickInteractionComponent', () => {
  let component: MethodQuickInteractionComponent;
  let fixture: ComponentFixture<MethodQuickInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MethodQuickInteractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodQuickInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
