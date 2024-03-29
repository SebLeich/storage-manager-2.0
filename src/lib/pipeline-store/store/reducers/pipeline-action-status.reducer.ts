import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import moment from "moment";
import { IPipelineActionStatusInformation } from "../../interfaces/pipeline-action-status.interface";
import { updateIPipelineActionStatus, updateIPipelineActionStatuses } from "../actions/pipeline-action-status.action";
import { addIPipelineActions } from "../actions/pipeline-action.actions";
import { removePipeline } from "../actions/pipeline.actions";

export const featureKey = 'pipelineActionStatus';

export interface State extends EntityState<IPipelineActionStatusInformation> {
    ids: string[];
}

export const adapter: EntityAdapter<IPipelineActionStatusInformation> = createEntityAdapter<IPipelineActionStatusInformation>(
    {
        selectId: (pipeline) => pipeline.pipelineAction,
        sortComparer: (pipeline1, pipeline2) => {
            return pipeline1.pipelineAction > pipeline2.pipelineAction ? 1 : -1;
        }
    }
);

export const initialState: State = adapter.getInitialState({
    entities: {},
    ids: [],
});

export const reducer = createReducer(
    initialState,

    on(addIPipelineActions, (state, { pipelineActions }) => {
        return adapter.addMany(
            pipelineActions.map(pipelineAction => ({ 'pipelineAction': pipelineAction.identifier, 'status': 'INITIALIZED', 'statusTimestamp': moment().format() } as IPipelineActionStatusInformation)),
            state
        );
    }),

    on(removePipeline, (state, { pipeline }) => {
        const effectedPipelineActions = Object.values(state.entities).filter(action => action?.pipeline === pipeline.id) as IPipelineActionStatusInformation[];
        return adapter.removeMany(effectedPipelineActions.map(action => action.pipelineAction), state);
    }),

    on(updateIPipelineActionStatus, (state, { pipelineActionStatus, pipelineName }) => {
        return adapter.updateOne(
            {
                id: pipelineName,
                changes: {
                    status: pipelineActionStatus,
                    statusTimestamp: moment().format(),
                }
            },
            state
        );
    }),

    on(updateIPipelineActionStatuses, (state, { pipelineActions, pipelineActionStatus }) => {
        return adapter.updateMany(
            pipelineActions.map(action => ({
                id: action.identifier,
                changes: {
                    status: pipelineActionStatus
                }
            })),
            state
        );
    })
)
