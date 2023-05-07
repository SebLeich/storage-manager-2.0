import { IFunctionTemplate } from "../interfaces/function-template.interface";

export class PredefinedFunctionTemplates {

    public customJSMethod(identifier: number, name = 'custom JS function'): IFunctionTemplate {
        return {
            identifier: identifier,
            description: 'a self-written, custom javascript code snippet',
            inputTemplates: null,
            name: name,
            useDynamicInputParams: true,
            payload: undefined,
            outputTemplate: 'dynamic',
            requireCustomImplementation: true
        } as IFunctionTemplate;
    }

    public delayMethod(identifier: number, name = 'delay'): IFunctionTemplate {
        return {
            identifier: identifier,
            canFail: false,
            description: 'the method delays the further pipe execution',
            inputTemplates: [
                {
                    type: 'number',
                    name: 'delay',
                    default: 1000
                }
            ],
            name: name,
            implementation: `async () => {
                let delay!: number;
                return await firstValueFrom(timer(delay));
            }`,
            outputTemplate: null,
            requireCustomImplementation: false
        } as IFunctionTemplate;
    }

    public downloadAsJson(identifier: number, name = 'download as json'): IFunctionTemplate {
        return {
            identifier: identifier,
            canFail: true,
            description: 'the method tries to parse the input and downloads it as json',
            inputTemplates: [
                {
                    type: 'object',
                    name: 'contentToDownload',
                    default: {}
                },
                {
                    type: 'string',
                    name: 'fileName',
                    default: "unnamedFile"
                }
            ],
            name: name,
            implementation: `async () => {
                let contentToDownload!: object, fileName!: string;
                const content = JSON.stringify(contentToDownload);
                const element = document.createElement('a');
                element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(content));
                element.setAttribute('download', fileName + '.json');
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
                return new Promise<void>((resolve => resolve()));
            }`,
            outputTemplate: null,
            requireCustomImplementation: false
        } as IFunctionTemplate;
    }

    public simulateFailMethod(identifier: number, name = 'fail'): IFunctionTemplate {
        return {
            identifier: identifier,
            canFail: true,
            description: 'the method throws an error',
            inputTemplates: null,
            name: name,
            implementation: `async () => {
                throw 'mock error';
            }`,
            outputTemplate: null,
            requireCustomImplementation: false
        } as IFunctionTemplate;
    }

    public uploadFromJson(identifier: number, name = 'upload from json'): IFunctionTemplate {
        return {
            identifier: identifier,
            canFail: true,
            description: 'the method uploads a json and imports the data as param',
            inputTemplates: [
                {
                    type: 'string',
                    name: 'inputName',
                    default: 'uploaded input'
                }
            ],
            name: name,
            outputTemplate: "dynamic",
            requireCustomImplementation: false
        } as IFunctionTemplate;
    }


}
