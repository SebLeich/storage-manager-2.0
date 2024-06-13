import { SolutionValidationError } from "../enums/solution-validation-error.enum";

export type SolutionValidationErrorWrapper = {
    error: SolutionValidationError;
    args?: { good?: string | null; id?: string | null, overlapingWith?: string | null };
};