import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommaSeparatedListComponent } from './comma-separated-list.component';

describe('CommaSeparatedListComponent', () => {
  let component: CommaSeparatedListComponent;
  let fixture: ComponentFixture<CommaSeparatedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommaSeparatedListComponent]
    });
    fixture = TestBed.createComponent(CommaSeparatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
