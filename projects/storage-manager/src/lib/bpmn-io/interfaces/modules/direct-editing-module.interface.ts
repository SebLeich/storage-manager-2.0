export interface IDirectEditingModule {
    $textbox?: HTMLDivElement;
    activate: () => void;
    cancel: () => void;
    complete: () => void;
    getValue: () => string;
    isActive: () => boolean;
    registerProvider: (provider: any) => void;
}