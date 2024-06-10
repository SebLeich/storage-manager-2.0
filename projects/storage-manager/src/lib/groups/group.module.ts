import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './store/group.reducer';
import { TranslationModule } from '../translation';
import { GroupSelectionComponent } from './components/group-selection/group-selection.component';
import { InputModule } from '../input/input.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [GroupSelectionComponent],
    exports: [GroupSelectionComponent],
    imports: [
        CommonModule,
        InputModule,
        ReactiveFormsModule,
        StoreModule.forFeature(featureKey, reducer),
        TranslationModule
    ]
})
export class GroupModule { }
