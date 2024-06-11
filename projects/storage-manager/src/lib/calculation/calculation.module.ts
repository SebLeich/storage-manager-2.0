import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalculationComponent } from './components/calculation/calculation.component';
import { ScaffoldModule } from '../scaffold/scaffold.module';
import { OrderModule } from '../order/order.module';
import { CalculationSidebarComponent } from './components/calculation/calculation-sidebar/calculation-sidebar.component';
import { InputModule } from '../input/input.module';
import { StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './store/calculation.reducer';
import { GroupModule } from '../groups/group.module';



@NgModule({
    declarations: [
        CalculationComponent,
        CalculationSidebarComponent
    ],
    imports: [
        CommonModule,
        GroupModule,
        InputModule,
        OrderModule,
        RouterModule.forChild([
            {
                path: '',
                component: CalculationComponent
            }
        ]),
        ScaffoldModule,
        StoreModule.forFeature(featureKey, reducer)
    ],
})
export class CalculationModule { }
