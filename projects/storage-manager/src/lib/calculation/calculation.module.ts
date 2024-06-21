import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalculationComponent } from './components/calculation/calculation.component';
import { ScaffoldModule } from '../scaffold/scaffold.module';
import { OrderModule } from '../order/order.module';
import { CalculationSidebarComponent } from './components/calculation/calculation-sidebar/calculation-sidebar.component';
import { InputModule } from '../input/input.module';
import { StoreModule } from '@ngrx/store';
import { FEATURE_KEY, REDUCER } from './store/calculation.reducer';
import { GroupModule } from '../groups/group.module';
import { NgLetModule } from 'ng-let';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { CalculationFooterComponent } from './components/calculation/calculation-footer/calculation-footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SolutionWrapperPreviewComponent } from './components/calculation/calculation-sidebar/solution-wrapper-preview/solution-wrapper-preview.component';
import { MatMenuModule } from '@angular/material/menu';
import { ApiConnectorModule } from '../api-connector/api-connector.module';
import { CogwheelIconModule } from '../cogwheel-icon/cogwheel-icon.module';
import { CalculationIconModule } from '../calculation-icon/calculation-icon.module';



@NgModule({
    declarations: [
        CalculationComponent,
        CalculationFooterComponent,
        CalculationSidebarComponent,
        SolutionWrapperPreviewComponent
    ],
    imports: [
        ApiConnectorModule,
        CalculationIconModule,
        CogwheelIconModule,
        CommonModule,
        GroupModule,
        InputModule,
        MatIconModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        NgLetModule,
        OrderModule,
        RouterModule.forChild([
            {
                path: '',
                component: CalculationComponent
            }
        ]),
        ScaffoldModule,
        SharedModule,
        StoreModule.forFeature(FEATURE_KEY, REDUCER)
    ],
})
export class CalculationModule { }
