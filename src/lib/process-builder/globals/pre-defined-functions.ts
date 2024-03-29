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
            requireCustomImplementation: true,
            requireStaticOutputDefinition: false,
            outputTemplateIsArray: false,
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
                    default: 1000,
                    optional: true,
                }
            ],
            name: name,
            implementation: `async () => {
                return await firstValueFrom(timer(delay));
            }`,
            outputTemplate: null,
            requireCustomImplementation: false,
            requireStaticOutputDefinition: false
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
                const content = JSON.stringify(contentToDownload);
                const element = document.createElement('a');
                element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(content));
                element.setAttribute('download', fileName + '.json');
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
                return new Promise((resolve => resolve()));
            }`,
            outputTemplate: null,
            requireCustomImplementation: false,
            requireStaticOutputDefinition: false,
            htmlDetailsHref: 'http://localhost:3000/function-details/2',
        } as IFunctionTemplate;
    }

    public provideStaticData(identifier: number, name = 'provide static data'): IFunctionTemplate {
        return {
            identifier: identifier,
            canFail: false,
            description: 'provide static data during design time',
            inputTemplates: null,
            name: name,
            outputTemplate: 'dynamic',
            requireCustomImplementation: true,
            requireStaticOutputDefinition: true,
            outputTemplateIsArray: false,
        }
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
            requireCustomImplementation: false,
            requireStaticOutputDefinition: false
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
            requireCustomImplementation: false,
            requireStaticOutputDefinition: false
        } as IFunctionTemplate;
    }


}
