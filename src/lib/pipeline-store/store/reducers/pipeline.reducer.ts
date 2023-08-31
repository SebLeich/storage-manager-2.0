import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { addPipeline, removePipeline, renamePipelineById, setSelectedPipeline, setPipelineSolutionReference, removePipelineById, renamePipeline } from "../actions/pipeline.actions";
import IPipeline from "src/lib/pipeline-store/interfaces/pipeline.interface";

export const featureKey = 'pipeline';

export interface State extends EntityState<IPipeline> {
    ids: string[];
    lastSelectedPipeline: string | null;
}

export const adapter: EntityAdapter<IPipeline> = createEntityAdapter<IPipeline>(
    {
        selectId: (pipeline) => pipeline.id,
        sortComparer: (pipelineA, pipelineB) => {
            return pipelineA.id > pipelineB.id ? 1 : -1;
        }
    }
);

export const initialState: State = adapter.getInitialState({
    lastSelectedPipeline: null,
    entities: {},
    ids: [],
});

export const reducer = createReducer(
    initialState,
    on(addPipeline, (state, { pipeline }) => {
        return adapter.addOne(
            { ...pipeline },
            state
        );
    }),
    on(renamePipeline, (state, { pipeline, updatedName }) => {
        return adapter.updateOne({
            id: pipeline.id,
            changes: {
                name: updatedName
            }
        }, state)
    }),
    on(renamePipelineById, (state, { pipelineIdentifier, updatedName }) => {
        return adapter.updateOne({
            id: pipelineIdentifier,
            changes: {
                name: updatedName
            }
        }, state)
    }),
    on(removePipeline, (state, { pipeline }) => adapter.removeOne(pipeline.id, state)),
    on(removePipelineById, (state, { pipelineIdentifier }) => adapter.removeOne(pipelineIdentifier, state)),
    on(setPipelineSolutionReference, (state, { pipelineId, solutionIdentifier }) => {
        return adapter.updateOne({
            id: pipelineId,
            changes: {
                solutionReference: solutionIdentifier
            }
        }, state);
    }),
    on(setSelectedPipeline, (state, { pipelineId }) => ({ ...state, lastSelectedPipeline: pipelineId }))
)
