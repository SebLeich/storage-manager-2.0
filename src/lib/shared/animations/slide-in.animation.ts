import { animate, style, transition, trigger } from "@angular/animations";

export const slideAnimation = trigger('slide', [
    transition(':enter', [
        style({ transform: 'translate(100%, 0px)' }),
        animate('.4s ease-out', style({
            transform: 'translate(0px, 0px)'
        }))
    ])
]);
