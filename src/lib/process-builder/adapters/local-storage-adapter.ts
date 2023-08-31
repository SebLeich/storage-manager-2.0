import { ApplicationRef, Injector } from "@angular/core";
import { upsertIFunctions } from "../store/actions/function.actions";
import { upsertIParams } from "../store/actions/param.actions";
import { selectCurrentIBpmnJSModelGuid, selectIBpmnJSModels } from "../store/selectors/bpmn-js-model.selectors";
import { IBpmnJSModel } from "../interfaces/bpmn-js-model.interface";
import { setCurrentIBpmnJSModel, upsertIBpmnJSModels } from "../store/actions/bpmn-js-model.actions";
import { selectIInterfaces, selectFunctions, selectIParams } from "@process-builder/selectors";
import { IFunction, IInterface, IParam } from "@process-builder/interfaces";
import { upsertIInterfaces } from "../store/actions/interface.actions";
import { Store } from "@ngrx/store";

export const localStorageAdapter = (injector: Injector) => {

    const store = injector.get(Store);

    store.select(selectIParams()).subscribe((params: IParam[]) => {
        localStorage.setItem('params', JSON.stringify(params));
    });

    store.select(selectFunctions()).subscribe((funcs: IFunction[]) => {
        localStorage.setItem('funcs', JSON.stringify(funcs));
    });

    store.select(selectIBpmnJSModels()).subscribe((models: IBpmnJSModel[]) => {
        localStorage.setItem('models', JSON.stringify(models));
    });

    store.select(selectCurrentIBpmnJSModelGuid).subscribe((currentModelGuid: string | null) => {
        localStorage.setItem('currentModelGuid', currentModelGuid ?? '');
    });
    
    store.select(selectIInterfaces()).subscribe((ifaces: IInterface[]) => {
        localStorage.setItem('ifaces', JSON.stringify(ifaces));
    });
}

export const provideLocalStorageSettings = (injector: Injector) => {

    const store = injector.get(Store);

    const funcsSetting = localStorage.getItem('funcs'),
        paramsSetting = localStorage.getItem('params'),
        bpmnJSModelsSetting = localStorage.getItem('models'),
        currentModelGuidSetting = localStorage.getItem('currentModelGuid'),
        interfacesSetting = localStorage.getItem('ifaces');

    if (funcsSetting) {

        try {

            let funcs: IFunction[] = JSON.parse(funcsSetting);
            store.dispatch(upsertIFunctions(funcs));

        } catch (e) {
            localStorage.removeItem('funcs');
        }

    }

    if (paramsSetting) {

        try {

            let params: IParam[] = JSON.parse(paramsSetting) as IParam[];
            store.dispatch(upsertIParams(params));

        } catch (e) {
            localStorage.removeItem('params');
        }

    }

    if (bpmnJSModelsSetting) {

        try {

            let models: IBpmnJSModel[] = JSON.parse(bpmnJSModelsSetting) as IBpmnJSModel[];
            store.dispatch(upsertIBpmnJSModels(models));

        } catch (e) {
            localStorage.removeItem('models');
        }

    }

    if (currentModelGuidSetting) {

        try {
            store.dispatch(setCurrentIBpmnJSModel(currentModelGuidSetting));
        } catch (e) {
            localStorage.removeItem('currentModelGuid');
        }

    }

    if (interfacesSetting) {

        try {

            let ifaces: IInterface[] = JSON.parse(interfacesSetting) as IInterface[];
            store.dispatch(upsertIInterfaces(ifaces));

        } catch (e) {
            localStorage.removeItem('ifaces');
        }

    }

    injector.get(ApplicationRef).tick();

}
