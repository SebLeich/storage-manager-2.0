import { animate, state, style, transition, trigger } from "@angular/animations";

export const showAnimation = trigger('show', [
    state('void', style({
        opacity: 0,
        transform: 'scale(.8)'
    })),
    state('*', style({
        opacity: 1,
        transform: 'scale(1)'
    })),
    transition('void => *', [
        animate('.2s ease-out')
    ])
]);
