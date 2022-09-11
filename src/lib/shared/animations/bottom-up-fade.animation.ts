import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

export const widgetFadeInAnimation = trigger('widgetFadeIn', [
    transition(':enter', [
        query('.widget', style({
            opacity: 0,
            transform: 'scale(1.03) translate(0px, 20px)'
        })),
        query('.widget', stagger(100, [
            animate('250ms', style({
                opacity: 1,
                transform: 'scale(1) translate(0px, 0px)'
            }))
        ]))
    ])
]);
