export interface ITooltipModule {
    add: (data: { position: { x: number, y: number }, html: string }) => void;
    hide: () => void;
    remove: (data: any) => void;
    show: () => void;
    _tooltips: { [key: string]: object };
}