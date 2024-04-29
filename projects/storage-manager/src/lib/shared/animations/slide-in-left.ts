import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideInLeftAnimation = trigger('slideInLeft', [
    state('void', style({
        transform: 'translateX(-100%)'
    })),
    state('*', style({
        transform: 'translateX(0%)'
    })),
    transition('void => *', [
        animate('.2s ease-out')
    ])
]);
