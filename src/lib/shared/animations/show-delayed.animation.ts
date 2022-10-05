import { animate, state, style, transition, trigger } from "@angular/animations";

export const showAnimation = trigger('show', [
    state('hidden', style({
        opacity: 0
    })),
    state('visible', style({
        opacity: 1
    })),
    transition('hidden => visible', [
        animate('.2s .3s ease-out')
    ])
]);