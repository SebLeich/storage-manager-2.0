import { animate, state, style, transition, trigger } from "@angular/animations";

export const fadeInAnimation = trigger('fadeIn', [
    state('void', style({
        opacity: 0,
        transform: 'scale(.6)'
    })),
    state('*', style({
        opacity: 1,
        transform: 'scale(1)'
    })),
    transition('void => *', [
        animate('1s ease-out')
    ])
]);
