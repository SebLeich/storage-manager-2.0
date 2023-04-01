export interface IInputParam {
    type: 'number' | 'string' | 'boolean' | 'array' | 'object';
    interface?: number;
    optional: boolean;
    name: string;
    default?: unknown;
}
