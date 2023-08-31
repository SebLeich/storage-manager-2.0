import { Completion, CompletionContext } from "@codemirror/autocomplete";
import { ICodeCompletionProvider } from "../interfaces/code-completion-provider.interface";
import { syntaxTree } from "@codemirror/language";

export class RxjsPipeCompletionProvider implements ICodeCompletionProvider {
    public async provideCompletions(context: CompletionContext): Promise<Completion[]> {
        let completions: Completion[] = [];
        const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
        const parent = nodeBefore.parent;
        if (parent?.type.name === 'ArgList') {
            const prevSibling = parent.prevSibling;
            if (prevSibling && prevSibling.type.name === 'MemberExpression') {
                const prevSiblingName = context.state.sliceDoc(prevSibling.from, prevSibling.to);
                if (/.*.pipe.*/.test(prevSiblingName)) {
                    completions.push(...this.rxjsPipeMethods());
                }
            }
        } else if (parent?.parent?.type.name === 'Block') {
            completions.push(...this.rxjsStandaloneMethods());
        }

        if(nodeBefore?.type.name === 'VariableName'){
            const representation = context.state.sliceDoc(nodeBefore.from, nodeBefore.to);
            completions = completions.filter(completion => completion.label.startsWith(representation));
        }

        return completions;
    }

    private rxjsPipeMethods(): Completion[] {
        return [
            { type: 'function', label: 'catchError', detail: 'use in pipe' },
            { type: 'function', label: 'debounceTime', detail: 'use in pipe' },
            { type: 'function', label: 'delay', detail: 'use in pipe' },
            { type: 'function', label: 'map', detail: 'use in pipe' },
            { type: 'function', label: 'merge', detail: 'use in pipe' },
            { type: 'function', label: 'mergeMap', detail: 'use in pipe' },
            { type: 'function', label: 'scan', detail: 'use in pipe' },
            { type: 'function', label: 'switchMap', detail: 'use in pipe' },
            { type: 'function', label: 'tap', detail: 'use in pipe' },
            { type: 'function', label: 'throwError', detail: 'use in pipe' },
        ];
    }

    private rxjsStandaloneMethods(): Completion[] {
        return [
            { type: 'function', label: 'defer', detail: 'defer observable creation' },
            { type: 'function', label: 'firstValueFrom', detail: 'promise from observable' },
            { type: 'function', label: 'lastValueFrom', detail: 'promise from observable' },
            { type: 'function', label: 'Observable', apply: 'new Observable((subscriber) =>\n  {\n\n  });', detail: 'create observable' },
        ];
    }
}