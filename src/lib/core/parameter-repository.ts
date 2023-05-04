import { IParam } from '../process-builder/interfaces/param.interface';
import { IParamDefinition } from '../process-builder/interfaces/param-definition.interface';

export class ParameterRepository {
  public static filterParams(
    allParams: IParam[],
    type:
      | 'number'
      | 'string'
      | 'boolean'
      | 'object'
      | 'array'
      | 'symbol'
      | 'undefined'
      | 'function'
      | 'bigint'
  ) {
    return allParams.filter((x) => x.type === type);
  }

  public static objectsMatch(
    a: IParamDefinition | null | undefined,
    b: IParamDefinition | null | undefined
  ): boolean {
    if (!a || !b) {
      console.warn('passed at least one undefined param; ', a, b);
      console.trace();
      return false;
    }

    if (a.type !== 'object' && a.type !== 'array'){
        return a.type === b.type;
    }
    else if (a.type === 'object') {
      for (const entry of a.typeDef as IParamDefinition[]) {
        const counterpart = (b.typeDef as IParamDefinition[]).find(
          (x) => x.name === entry.name && x.type === entry.type
        );
        if (!counterpart || !this.objectsMatch(entry, counterpart)) {
          return false;
        }
      }

      return true;
    } else if (a.type === 'array') {
      return this.objectsMatch((a.typeDef as IParamDefinition[])[0], (b.typeDef as IParamDefinition[])[0]);
    }

    return a.type === b.type;
  }
}
