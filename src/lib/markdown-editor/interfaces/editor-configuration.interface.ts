export interface IEditorConfiguration {
    noBorder?: boolean;
    emitOn?: ('change' | 'blur' | 'enter')[];
    emitEvenIfPristine?: boolean;
    format?: 'html' | 'object' | 'text' | 'json';
}