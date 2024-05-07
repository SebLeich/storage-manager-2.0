import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { GoodsPanelComponent } from './goods-panel.component';
import { By } from '@angular/platform-browser';
import { IGood } from '@smgr/interfaces';

describe('GoodsPanelComponent', () => {
    let component: GoodsPanelComponent;
    let debugElement: DebugElement;
    let fixture: ComponentFixture<GoodsPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GoodsPanelComponent],
            imports: [
                ...defaultImportsConstant,

                AppModule
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
});
