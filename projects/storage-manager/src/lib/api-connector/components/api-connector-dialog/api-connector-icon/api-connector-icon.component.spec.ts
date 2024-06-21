import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiConnectorIconComponent } from './api-connector-icon.component';

describe('ApiConnectorIconComponent', () => {
  let component: ApiConnectorIconComponent;
  let fixture: ComponentFixture<ApiConnectorIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiConnectorIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiConnectorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
