import { InjectionToken } from "@angular/core";

export enum Algorithm {
    AllInOneRow, StartLeftBottom, SuperFlo, AISupportedSolver
}

export enum SolutionError {
    NoSolution, NoContainer, GoodBeforeContainerXCoord, GoodOutOfContainerXCoord, GoodBeforeContainerYCoord, GoodOutOfContainerYCoord, GoodBeforeContainerZCoord, GoodOutOfContainerZCoord, GoodOverlap
}

export const algorithms = [
    {
        title: 'All In One Row',
        description: 'That algorithm takes all orders and puts each good in front of the previous one.',
        code: Algorithm.AllInOneRow
    },
    {
        title: 'Start Left Bottom',
        description: 'Dieser Algorithmus sortiert alle Güter entsprechend der vorgegebenen Sortierung, schiebt die Güter möglichst weit hinter und ermöglicht das Stapeln',
        code: Algorithm.StartLeftBottom
    },
    {
        title: 'Super-Flo',
        description: 'Dieser Algorithmus berechnet Lösungen mit Hilfe von zwischengespeicherten Räumen. Diese werden entsprechend definierter Minimierungsfunktionen für das Einräumen ausgewählt und anschließend in Teilfreiräume zerlegt.',
        code: Algorithm.SuperFlo
    },
    {
        title: 'AI Supported Solver',
        description: 'Dieser Algorithmus berechnet Lösungen mit Hilfe von heuristischen und AI-basierten Ansätzen.',
        code: Algorithm.AISupportedSolver
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

export const units = [
    { unit: 'mm', next: 10, threshold: 100 },
    { unit: 'cm', next: 100, threshold: 100 },
    { unit: 'm', next: 1000, threshold: 1000 },
    { unit: 'km', next: null, threshold: null },
];

export const defaultGoodEdgeColor = '#2a2a2a';
export const selectedGoodEdgeColor = '#ff7e00';
export const keyboardControlMoveStep = 500;

export const infinityReplacement = 100;

export const RootViewContainerRef = new InjectionToken('RootViewContainerRef');
