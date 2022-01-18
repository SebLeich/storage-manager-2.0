export function generateGuid() {
    return 'axxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export enum ALGORITHMS {
    ALL_IN_ONE_ROW, START_LEFT_BOTTOM, SUPER_FLO, AI_SUPPORTED_SOLVER
}

export const algorithms = [
    {
        title: 'All In One Row',
        description: 'Dieser Algorithmus sortiert alle Güter an der linken Seite des Containers direkt voreinander.',
        code: ALGORITHMS.ALL_IN_ONE_ROW
    },
    {
        title: 'Start Left Bottom',
        description: 'Dieser Algorithmus sortiert alle Güter entsprechend der vorgegebenen Sortierung, schiebt die Güter möglichst weit hinter und ermöglicht das Stapeln',
        code: ALGORITHMS.START_LEFT_BOTTOM
    },
    {
        title: 'Super-Flo',
        description: 'Dieser Algorithmus ...',
        code: ALGORITHMS.SUPER_FLO
    },
    {
        title: 'AI Supported Solver',
        description: 'Dieser Algorithmus ...',
        code: ALGORITHMS.AI_SUPPORTED_SOLVER
    }
]

export function compare(a: number | string, b: number | string, isAsc: boolean = true) {
    if (!a) a = '';
    if (!b) b = '';
    if (typeof (a) === 'string') a = a.trim().toLocaleLowerCase();
    if (typeof (b) === 'string') b = b.trim().toLocaleLowerCase();
    let result = (a < b ? -1 : a > b ? 1 : 0) * (isAsc ? 1 : -1);
    return result;
}

export const nameOf = <T>(name: Extract<keyof T, string>): string => name;

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

export enum MinimizationFunction {
    MIN_X, MIN_Y, MIN_Z, MIN_VOLUME
}

export const infinityReplacement = 100;
