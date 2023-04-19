import { Completion, CompletionContext } from "@codemirror/autocomplete";
import { ICodeCompletionProvider } from "../interfaces/code-completion-provider.interface";
import { syntaxTree } from "@codemirror/language";

export class HttpClientCompletionProvider implements ICodeCompletionProvider {
    public async provideCompletions(context: CompletionContext): Promise<Completion[]> {
        const completions: Completion[] = this.httpClientMethods();
        const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
        const parent = nodeBefore.parent;
        if (parent) {
            const parentName = context.state.sliceDoc(parent.from, parent.to);
            if(parentName){
                
            }
        }
        // TODO

        return completions;
    }

    private httpClientMethods(): Completion[] {
        return [
            { type: 'function', label: 'httpClient.get()', apply: 'httpClient.get(/*url*/, /*options?*/).toPromise()', detail: 'asynchronously' },
            { type: 'function', label: 'httpClient.post()', apply: 'httpClient.post(/*url*/, /*data*/, /*options?*/).toPromise()', detail: 'asynchronously' },
            { type: 'function', label: 'httpClient.put()', apply: 'httpClient.put(/*url*/, /*data*/, /*options?*/).toPromise()', detail: 'asynchronously' },
            { type: 'function', label: 'httpClient.delete()', apply: 'httpClient.delete(/*url*/, /*options?*/).toPromise()', detail: 'asynchronously' },
            { type: 'class', label: 'HttpHeaders', apply: 'new HttpHeaders()', detail: 'create http headers' },
            { type: 'class', label: 'HttpHeaders.set()', apply: 'new HttpHeaders().set(/*headerName*/, /*headerValue(s)*/)', detail: 'create http headers' }
        ];
    }
}