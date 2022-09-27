import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { GoodsPanelComponent } from './goods-panel.component';

describe('GoodsPanelComponent', () => {
  let component: GoodsPanelComponent;
  let fixture: ComponentFixture<GoodsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodsPanelComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ]
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
