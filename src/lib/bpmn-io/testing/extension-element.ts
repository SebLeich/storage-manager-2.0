import { IExtensionElementsWrapper } from "../interfaces/extension-elements-wrapper.interface";

class ExtensionElementWrapper implements IExtensionElementsWrapper {
    private _values = [];
    public get(key: keyof IExtensionElementsWrapper) {
        return this[key];
    }
    public get values() {
        return this._values;
    }
}
export default ExtensionElementWrapper;