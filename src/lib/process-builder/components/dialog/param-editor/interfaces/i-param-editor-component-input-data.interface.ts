import { ParamCodes } from "src/config/param-codes";
import { IElement } from "src/lib/bpmn-io/i-element";

export interface IParamEditorComponentInputData {
  paramCode: ParamCodes | 'dynamic';
  element: IElement;
}
