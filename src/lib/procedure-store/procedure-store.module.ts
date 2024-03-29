import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPendingProcedureEffects } from '../procedure-store/store/pending-procedure.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromIPendingProceduresState from '../procedure-store/store/pending-procedure.reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromIPendingProceduresState.featureKey, fromIPendingProceduresState.reducer),
    EffectsModule.forFeature([IPendingProcedureEffects])
  ]
})
export class ProcedureStoreModule { }
