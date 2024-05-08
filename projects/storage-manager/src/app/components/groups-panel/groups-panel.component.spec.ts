import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { GroupsPanelComponent } from './groups-panel.component';
import { APP_BASE_HREF } from '@angular/common';

describe('GroupsPanelComponent', () => {

    let component: GroupsPanelComponent;
    let fixture: ComponentFixture<GroupsPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupsPanelComponent],
            imports: [
                ...defaultImportsConstant,
                AppModule
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupsPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
