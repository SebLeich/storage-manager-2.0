import { inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { timer } from "rxjs/internal/observable/timer";
import { AllInOneRowSolver } from "src/lib/storage-manager/solvers/all-in-one-row.solver";
import { InterfaceCodes } from "src/config/interface-codes";
import { IGroup, IOrder } from "@smgr/interfaces";
import { UserInputComponent } from "../components/helpers/user-input/user-input.component";
import { IFunction } from "../interfaces/function.interface";

export class PredefinedFunctions {

    public customJSMethod(identifier: number, name: string = 'custom JS function'): IFunction {
        return {
            'identifier': identifier,
            'canFail': false,
            'description': 'a self-written, custom javascript code snippet',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': true,
            'implementation': (...args: any) => args,
            'payload': undefined,
            'output': { 'param': 'dynamic' },
            'requireCustomImplementation': true
        } as IFunction;
    }

    public delayMethod(identifier: number, name: string = 'delay'): IFunction {
        return {
            'identifier': identifier,
            'canFail': false,
            'description': 'the method delays the further pipe execution',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': false,
            'implementation': () => {
                return firstValueFrom(timer(1000));
            },
            'payload': undefined,
            'output': null,
            'requireCustomImplementation': false
        } as IFunction;
    }

    public failMethod(identifier: number, name: string = 'fail'): IFunction {
        return {
            'identifier': identifier,
            'canFail': true,
            'description': 'the method throws an error',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': false,
            'implementation': () => {
                throw 'mock error';
            },
            'payload': undefined,
            'output': null,
            'requireCustomImplementation': false
        } as IFunction;
    }

    public objectToObjectMappingMethod(identifier: number, name: string = 'object mapping'): IFunction {
        return {
            'identifier': identifier,
            'canFail': false,
            'description': 'a method for object-to-object mapping',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': { typeLimits: ['object'] },
            'implementation': (...args: any) => args,
            'payload': undefined,
            'output': { 'param': 'dynamic' }
        } as IFunction;
    }

    public requestUserInput(identifier: number, name: string = 'request input'): IFunction {
        return {
            'identifier': identifier,
            'canFail': true,
            'description': 'request a set of custom inputs during runtime',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': { typeLimits: ['object'] },
            'implementation': async () => {
                const dialog = inject(MatDialog);
                const result = await firstValueFrom(dialog.open(UserInputComponent, { data: [] }).afterClosed());
                return result;
            },
            'payload': undefined,
            'output': { 'param': 'dynamic' }
        } as IFunction;
    }

    public allInOneRowMethod(identifier: number, name: string = 'all in one row'): IFunction {
        return {
            'identifier': identifier,
            'canFail': false,
            'description': 'the method delays the further pipe execution',
            inputParams: [
                { type: 'number', optional: false, name: 'containerHeight' },
                { type: 'number', optional: false, name: 'containerWidth' },
                { type: 'array', interface: InterfaceCodes.Group, optional: false, name: 'groups' },
                { type: 'array', interface: InterfaceCodes.Order, optional: false, name: 'orders' },
            ],
            'name': name,
            'useDynamicInputParams': false,
            'implementation': async () => {
                let containerHeight!: number, containerWidth!: number, groups!: IGroup[], orders: IOrder[];
                const algorithm = new AllInOneRowSolver();
                return algorithm.solve(containerHeight!, containerWidth!, groups!, orders!);
            },
            'payload': undefined,
            'output': null,
            'requireCustomImplementation': false
        } as IFunction;
    }

}
