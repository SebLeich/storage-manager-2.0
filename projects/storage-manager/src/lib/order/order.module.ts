import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './store/order.reducer';
import { OrderListComponent } from './components/order-list/order-list.component';
import { TranslationModule } from '../translation';
import { InputModule } from '../input/input.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NgLetModule } from 'ng-let';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GroupModule } from '../groups/group.module';



@NgModule({
    declarations: [OrderListComponent],
    exports: [OrderListComponent],
    imports: [
        CommonModule,
        InputModule,
        GroupModule,
        MatIconModule,
        MatTooltipModule,
        NgLetModule,
        ReactiveFormsModule,
        StoreModule.forFeature(featureKey, reducer),
        TranslationModule
    ]
})
export class OrderModule { }
