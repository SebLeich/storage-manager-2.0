import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { IPipelineAction } from "src/lib/pipeline-store/interfaces/pipeline-action.interface";
import { addIPipelineAction, addIPipelineActions, setIPipelineActionSolution } from "../actions/pipeline-action.actions";
import { removeIPipeline } from "../actions/pipeline.actions";

export const featureKey = 'pipelineAction';

export interface State extends EntityState<IPipelineAction> {
    ids: string[];
}

export const adapter: EntityAdapter<IPipelineAction> = createEntityAdapter<IPipelineAction>(
    {
        selectId: (pipeline) => pipeline.identifier,
        sortComparer: (action1, action2) => {
            return action1.name > action2.name ? 1 : -1;
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
    }),
    on(removeIPipeline, (state, { pipeline }) => {
        const effectedPipelineActions = Object.values(state.entities).filter(action => action?.pipeline === pipeline.name) as IPipelineAction[];
        return adapter.removeMany(effectedPipelineActions.map(action => action.identifier), state);
    }),
    on(setIPipelineActionSolution, (state, { pipelineActionIdentifier, solutionReference }) => {
        return adapter.updateOne({
            id: pipelineActionIdentifier,
            changes: {
                solutionReference: solutionReference
            }
        }, state);
    }),
)
