import { animate, state, style, transition, trigger } from "@angular/animations";

export const showAnimation = trigger('show', [
    state('hidden', style({
        opacity: 0,
        transform: 'scale(.8)'
    })),
    state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
    })),
    transition('hidden => visible', [
        animate('.2s .2s ease-out')
    ])
]);