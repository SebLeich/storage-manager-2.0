import { ISolutionWrapper } from "@/lib/storage-manager/interfaces";
import { createReducer, on } from "@ngrx/store";
import { setSolution } from "./visualization.actions";

export const FEATURE_KEY = 'VISUALIZATION';

export interface State {
    solutionWrapper: ISolutionWrapper | null;
}

export const INITIAL_STATE: State = {
    solutionWrapper: {
        solution: {
            calculated: new Date().toISOString(),
            calculationSource: {
                title: 'Super Flo'
            },
            container: {
                goods: [
                    {
                        xCoord: 0,
                        yCoord: 0,
                        zCoord: 0,
                        length: 500,
                        width: 500,
                        height: 500,
                        sequenceNr: 0,
                    },
                    {
                        xCoord: 0,
                        yCoord: 0,
                        zCoord: 500,
                        length: 500,
                        width: 500,
                        height: 500,
                        sequenceNr: 1,
                    }
                ],
                length: 2000,
                width: 1000,
                height: 1000,
                xCoord: 0,
                yCoord: 0,
                zCoord: 0
            },
            description: 'Super Flo Solution'
        }
    } as any
}

export const REDUCER = createReducer(
    INITIAL_STATE,
    on(setSolution, (state, { solution }) => ({ ...state, solutionWrapper: solution }))
);