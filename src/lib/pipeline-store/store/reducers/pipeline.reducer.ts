import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { addIPipeline, removeIPipeline, renameIPipeline, setIPipelineSolutionReference } from "../actions/pipeline.actions";
import { IPipeline } from "src/lib/pipeline-store/interfaces/pipeline.interface";

export const featureKey = 'pipeline';

export interface State extends EntityState<IPipeline> {
    ids: string[];
}

export const adapter: EntityAdapter<IPipeline> = createEntityAdapter<IPipeline>(
    {
        selectId: (pipeline) => pipeline.name,
        sortComparer: (pipeline1, pipeline2) => {
            return pipeline1.name > pipeline2.name ? 1 : -1;
        }
    }
);

export const initialState: State = adapter.getInitialState({
    entities: {},
    ids: [],
});

export const reducer = createReducer(
    initialState,
    on(addIPipeline, (state, { pipeline }) => {
        return adapter.addOne(
            { ...pipeline },
            state
        );
    }),
    on(renameIPipeline, (state, { pipelineName, updatedName }) => {
        return adapter.updateOne({
            id: pipelineName,
            changes: {
                name: updatedName
            }
        }, state)
    }),
    on(removeIPipeline, (state, { pipeline }) => adapter.removeOne(pipeline.name, state)),
    on(setIPipelineSolutionReference, (state, { pipelineName, solutionIdentifier }) => {
        return adapter.updateOne({
            id: pipelineName,
            changes: {
                solutionReference: solutionIdentifier
            }
        }, state);
    })
)
