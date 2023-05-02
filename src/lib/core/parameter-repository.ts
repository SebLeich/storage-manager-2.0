import { IParam, IParamDefinition } from '@process-builder/interfaces';

export class ParameterRepository {

    static filterParams(allParams: IParam[], type: 'number' | 'string' | 'boolean' | 'object' | 'array' | 'symbol' | 'undefined' | 'function' | 'bigint') {
        return allParams.filter(x => x.type === type);
    }

    static objectsMatch(a: IParamDefinition | null | undefined, b: IParamDefinition | null | undefined): any {
        if (!a || !b) {
            console.warn('passed at least one undefined param; ', a, b);
            console.trace();
            return false;
        }
        if (a.type !== b.type) return false;
        if (a.type !== 'object' && a.type !== 'array') return a.type === b.type;
        else if (a.type === 'object') {
            for (let entry of (a.typeDef as IParamDefinition[])) {
                let counterpart = (b.typeDef as IParamDefinition[]).find(x => x.name === entry.name && x.type === entry.type);
                if (!counterpart || !this.objectsMatch(entry, counterpart)) return false;
            }
            return true;
        } else if (a.type === 'array') {
            return this.objectsMatch((a.typeDef as any)[0], (b.typeDef as any)[0]);
        }
    }

}
