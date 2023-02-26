import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import * as fromIPipeline from './store/reducers/pipeline.reducer';
import * as fromIPipelineAction from './store/reducers/pipeline-action.reducer';
import * as fromIPipelineActionStatus from './store/reducers/pipeline-action-status.reducer';
import { StorageManagerModule } from '../storage-manager/storage-manager.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StorageManagerModule,
    
    StoreModule.forFeature(fromIPipeline.featureKey, fromIPipeline.reducer),
    StoreModule.forFeature(fromIPipelineAction.featureKey, fromIPipelineAction.reducer),
    StoreModule.forFeature(fromIPipelineActionStatus.featureKey, fromIPipelineActionStatus.reducer),
  ]
})
export class PipelineStoreModule { }
