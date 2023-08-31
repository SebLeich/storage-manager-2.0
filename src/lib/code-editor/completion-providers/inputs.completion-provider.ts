import { Completion, CompletionContext } from "@codemirror/autocomplete";
import { ICodeCompletionProvider } from "../interfaces/code-completion-provider.interface";
import { syntaxTree } from "@codemirror/language";
import { deepObjectLookup } from "src/lib/shared/globals/deep-object-lookup.function";

export class InputsCompletionProvider implements ICodeCompletionProvider {

    constructor(public inputParams: { [param: string]: object | string | number } | null = null) { }

    public async provideCompletions(context: CompletionContext): Promise<Completion[]> {
        const inputParams = this.inputParams;
        if (!inputParams) {
            return [];
        }

        const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
        if (nodeBefore?.type?.name === '.') {
            const parent = nodeBefore.parent;
            if (parent?.type.name === 'MemberExpression') {
                const representation = context.state.sliceDoc(parent.from, parent.to)?.trim().replace(/.$/, '');
                if(representation){
                    const deepObj = deepObjectLookup(this.inputParams, representation);
                    return deepObj? Object.keys(deepObj).map(key => {
                        const type = typeof deepObj[key];
                        return {
                            label: `${key}`,
                            apply: `.${key}`,
                            type: type === 'function'? 'function': 'variable'
                        } as Completion;
                    }): [];
                }
            }
        }

        let completions: Completion[] = Object.keys(inputParams).map(key => {
            const type = typeof inputParams[key];
            return { label: key, type: type === 'function'? 'function': 'variable' } as Completion
        });
        if(nodeBefore?.type.name === 'VariableName'){
            const representation = context.state.sliceDoc(nodeBefore.from, nodeBefore.to);
            completions = completions.filter(completion => completion.label.startsWith(representation));
        }

        return completions;
    }
}
