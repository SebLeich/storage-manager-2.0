import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { IPipelineAction } from "src/lib/pipeline-store/interfaces/pipeline-action.interface";
import { addIPipelineAction, addIPipelineActions } from "../actions/pipeline-action.actions";

export const featureKey = 'pipelineAction';

export interface State extends EntityState<IPipelineAction> {
    ids: string[];
}

export const adapter: EntityAdapter<IPipelineAction> = createEntityAdapter<IPipelineAction>(
    {
        selectId: (pipeline) => pipeline.identifier,
        sortComparer: (pipeline1, pipeline2) => {
            return pipeline1.sequenceNumber > pipeline2.sequenceNumber ? 1 : -1;
        }
    }
);

export const initialState: State = adapter.getInitialState({
    entities: {},
    ids: [],
});

export const reducer = createReducer(
    initialState,
    on(addIPipelineAction, (state, { pipelineAction }) => {
        return adapter.addOne(
            { ...pipelineAction },
            state
        );
    }),
    on(addIPipelineActions, (state, { pipelineActions }) => {
        return adapter.addMany(
            pipelineActions,
            state
        );
    })
)
