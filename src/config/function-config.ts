import { IFunction } from "src/lib/process-builder/globals/i-function";
import { PredefinedFunctions } from "src/lib/process-builder/globals/pre-defined-functions";
import exampleSolution from "./example-solution";
import { ParamCodes } from "./param-codes";

export default [
    new PredefinedFunctions().customJSMethod(0),
    {
        'identifier': 1,
        'inputParams': [],
        'name': 'Provide exemplary solution',
        'normalizedName': 'provideExemplarySolution',
        'description': 'method provides an exemplary solution',
        'output': { 'param': ParamCodes.ExemplarySolution },
        'pseudoImplementation': () => {
            return new Promise((resolve) => resolve(exampleSolution));
        },
        'canFail': false
    } as IFunction,
    {
        'identifier': 2,
        'inputParams': null,
        'useDynamicInputParams': {
            'typeLimits': ['object']
        },
        'name': 'Download JSON',
        'normalizedName': 'downloadJSON',
        'description': 'method downloads object as json',
        'output': null,
        'pseudoImplementation': (arg: object) => {
            let sJson = JSON.stringify(arg), element = document.createElement('a');
            element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
            element.setAttribute('download', "storage-manager-download.json");
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },
        'canFail': false,
        'requireCustomImplementation': false
    } as IFunction,
    {
        'identifier': 3,
        'inputParams': null,
        'name': 'Upload JSON',
        'normalizedName': 'uploadJSON',
        'description': 'method enables to upload json objects',
        'output': {
            'param': 'dynamic'
        },
        'pseudoImplementation': () => {
            let promise = new Promise((resolve, reject) => {
                let input: HTMLInputElement = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'application/json');
                input.style.display = 'none';
                input.onchange = (evt) => {
                    let file: File = (evt.target as HTMLInputElement).files[0];
                    if (file) {
                        let fileReader = new FileReader();
                        fileReader.onload = () => {

                            try {

                                let obj = JSON.parse(fileReader.result as string);
                                resolve(obj);

                            } catch (err) {

                                reject('error parsing json object');

                            }

                        }
                        fileReader.readAsText(file);
                        document.body.removeChild(input);
                    } else {
                        document.body.removeChild(input);
                        reject('no input file');
                    }
                }
                document.body.appendChild(input);
                input.click();
            });
            return promise;
        },
        'canFail': false,
        'requireCustomImplementation': false
    } as IFunction,
    {
        'identifier': 4,
        'inputParams': null,
        'name': 'Map to solution',
        'normalizedName': 'mapToSolution',
        'description': 'method converts a given input to a reusable solution',
        'output': {
            'param': 'dynamic',
            'interface': 4
        },
        'canFail': false,
        'requireCustomImplementation': false,
        'requireDataMapping': true
    } as IFunction
];
