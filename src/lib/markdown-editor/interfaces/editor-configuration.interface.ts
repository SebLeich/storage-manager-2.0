export interface IEditorConfiguration {
    noBorder?: boolean;
    emitOn?: ('change' | 'blur' | 'enter')[];
    format?: 'html' | 'object' | 'text' | 'json';
}