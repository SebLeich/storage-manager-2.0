import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDataComponent } from './local-data.component';

describe('LocalDataComponent', () => {
  let component: LocalDataComponent;
  let fixture: ComponentFixture<LocalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
