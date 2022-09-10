import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

export const widgetFadeInAnimation = trigger('widgetFadeIn', [
    transition(':enter', [
        query('.widget', style({
            opacity: 0,
            transform: 'scale(1.02) translate(0px, 20px)'
        })),
        query('.widget', stagger(200, [
            animate('.4s', style({
                opacity: 1,
                transform: 'scale(1) translate(0px, 0px)'
            }))
        ]))
    ])
]);
