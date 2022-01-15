import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointInputComponent } from './endpoint-input.component';

describe('EndpointInputComponent', () => {
  let component: EndpointInputComponent;
  let fixture: ComponentFixture<EndpointInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
