import { Completion, CompletionContext } from "@codemirror/autocomplete";

export interface ICodeCompletionProvider {
    provideCompletions(context: CompletionContext): Promise<Completion[]>;
}