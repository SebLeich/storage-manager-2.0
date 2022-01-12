import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPreviewComponent } from './container-preview.component';

describe('ContainerPreviewComponent', () => {
  let component: ContainerPreviewComponent;
  let fixture: ComponentFixture<ContainerPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
