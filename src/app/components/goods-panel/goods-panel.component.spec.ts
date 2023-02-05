import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { GoodsPanelComponent } from './goods-panel.component';
import { By } from '@angular/platform-browser';
import { IGood } from 'src/lib/storage-manager-store/interfaces/good.interface';

describe('GoodsPanelComponent', () => {
  let component: GoodsPanelComponent;
  let debugElement: DebugElement;
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
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show hint if no goods available', () => {
    expect(debugElement.query(By.css('.no-content-available'))).toBeTruthy();
  });

  it('should hide hint if goods available', () => {
    component.goods = [
      { id: 'TESTING_GOOD', desc: 'testing good' } as IGood
    ];
    fixture.detectChanges();

    expect(debugElement.query(By.css('.no-content-available'))).toBeFalsy();
  });

  it('should show all goods in table', () => {
    component.goods = [
      { id: 'TESTING_GOOD_1', desc: 'testing good1' } as IGood,
      { id: 'TESTING_GOOD_2', desc: 'testing good2' } as IGood,
      { id: 'TESTING_GOOD_3', desc: 'testing good3' } as IGood
    ];
    fixture.detectChanges();

    expect(debugElement.queryAll(By.css('.smgr-table-body-row')).length).toBe(component.goods.length);
  });
});
