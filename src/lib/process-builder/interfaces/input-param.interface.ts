export interface IInputParam {
    type: 'number' | 'string' | 'boolean' | 'array' | 'object';
    interface?: string;
    optional: boolean;
    name: string;
    default?: unknown;
}
