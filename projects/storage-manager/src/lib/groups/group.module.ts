import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FEATURE_KEY, reducer } from './store/group.reducer';
import { TranslationModule } from '../translation';
import { GroupSelectionComponent } from './components/group-selection/group-selection.component';
import { InputModule } from '../input/input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupListComponent } from './components/group-list/group-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NgLetModule } from 'ng-let';



@NgModule({
    declarations: [GroupListComponent, GroupSelectionComponent],
    exports: [GroupListComponent, GroupSelectionComponent],
    imports: [
        CommonModule,
        InputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTooltipModule,
        NgLetModule,
        StoreModule.forFeature(FEATURE_KEY, reducer),
        TranslationModule
    ]
})
export class GroupModule { }
