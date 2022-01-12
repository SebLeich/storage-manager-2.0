export function generateGuid() {
    return 'axxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const nextUnitSize = [
    { unit: 'mm', next: 10, threshold: 1000 },
    { unit: 'cm', next: 10, threshold: 1000 },
    { unit: 'dm', next: 10, threshold: 1000 },
    { unit: 'm', next: 1000, threshold: 1000 },
    { unit: 'km', next: null, threshold: null },
];

export const defaultGoodEdgeColor = '#2a2a2a';
export const selectedGoodEdgeColor = '#ff7e00';
export const keyboardControlMoveStep = 2000;
