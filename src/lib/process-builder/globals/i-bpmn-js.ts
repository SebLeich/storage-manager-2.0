export interface IBpmnJS {
    _moddle: any;
    attachTo: (el: HTMLDivElement) => void;
    get: (module: string) => any;
    getDefinitions: () => any;
    importXML: (xml: string) => Promise<{ warnings: string[] }>;
    saveXML: () => Promise<{ xml: string }>;
}
