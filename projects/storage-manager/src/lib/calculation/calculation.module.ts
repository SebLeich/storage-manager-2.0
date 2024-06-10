import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalculationComponent } from './components/calculation/calculation.component';
import { ScaffoldModule } from '../scaffold/scaffold.module';
import { OrderModule } from '../order/order.module';
import { CalculationSidebarComponent } from './components/calculation/calculation-sidebar/calculation-sidebar.component';



@NgModule({
    declarations: [
        CalculationComponent,
        CalculationSidebarComponent
    ],
    imports: [
        CommonModule,
        OrderModule,
        RouterModule.forChild([
            {
                path: '',
                component: CalculationComponent
            }
        ]),
        ScaffoldModule
    ],
})
export class CalculationModule { }
