import { createSelector } from "@ngrx/store";
import { IPipelineAction } from "../../interfaces/pipeline-action.interface";
import { featureKey, State } from "../reducers/pipeline-action.reducer";

export const pipelineActionState = (state: any) => state[featureKey] as State;

export const selectPipelineAction = (pipelineActionIdentifier: string) => createSelector(
  pipelineActionState,
  (state: State) => {
    const pipelineAction = Object.values(state.entities ?? {}).find(pipelineAction => pipelineAction!.identifier === pipelineActionIdentifier);
    return pipelineAction ?? null;
  }
);

export const selectPipelineActionAndSuccessors = (pipelineActionIdentifier: string, except: 'onSuccess' | 'onError') => createSelector(
  pipelineActionState,
  (state: State) => {
    const allPipelineActions = Object.values(state.entities ?? {});
    const pipelineAction = allPipelineActions.find(pipelineAction => pipelineAction!.identifier === pipelineActionIdentifier);
    if (!pipelineAction) {
      return [];
    }

    let pendingActions: string[] = ['onSuccess', 'onError'].filter(successor => successor !== except)
      .map(successor => pipelineAction[successor as keyof IPipelineAction] as string)
      .filter(action => !!action) as string[], output = [pipelineAction];

    while (pendingActions.length > 0) {
      const action = allPipelineActions.find(pipelineAction => pipelineAction?.identifier === pendingActions[0]);
      if (action) {
        output.push(action);
      }
      pendingActions = pendingActions.slice(1);
    }

    return output;
  }
);

export const selectPipelineActionByPipelineName = (pipelineName: string) => createSelector(
  pipelineActionState,
  (state: State) => {
    const pipelineAction = Object.values(state.entities ?? {}).filter(pipelineAction => pipelineAction!.pipeline === pipelineName);
    return pipelineAction ?? null;
  }
);