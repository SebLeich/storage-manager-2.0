import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { addIPipeline, removeIPipeline } from "../actions/pipeline.actions";
import exemplarySolution from 'src/assets/exemplary-solution.json';
import { timer } from 'rxjs';
import { selectSnapshot } from "src/lib/process-builder/globals/select-snapshot";
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
    entities: {
        myPipe: {
            name: 'myPipe',
            actions: [
                {
                    name: 'delay', executableCode: async () => {
                        return await selectSnapshot(timer(1000));
                    }
                },
                {
                    name: 'provideExemplarySolution', executableCode: () => new Promise((resolve) => resolve(exemplarySolution))
                }
            ]
        }
    },
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
    on(removeIPipeline, (state, { pipeline }) => adapter.removeOne(pipeline.bpmnJsModelReference, state))
)
