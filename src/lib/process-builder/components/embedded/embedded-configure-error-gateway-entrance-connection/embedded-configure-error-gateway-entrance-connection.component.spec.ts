import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedConfigureErrorGatewayEntranceConnectionComponent } from './embedded-configure-error-gateway-entrance-connection.component';

describe('EmbeddedConfigureErrorGatewayEntranceConnectionComponent', () => {
  let component: EmbeddedConfigureErrorGatewayEntranceConnectionComponent;
  let fixture: ComponentFixture<EmbeddedConfigureErrorGatewayEntranceConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedConfigureErrorGatewayEntranceConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedConfigureErrorGatewayEntranceConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
