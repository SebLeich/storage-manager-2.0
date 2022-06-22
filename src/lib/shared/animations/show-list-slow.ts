import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

export const showListAnimation = trigger('showList', [
    transition('* => *', [ // each time the binding value changes
        query(':enter', [
            style({ opacity: 0 }),
            stagger(50, [
                animate('0.2s', style({ opacity: 1 }))
            ])
        ], {
            optional: true
        })
    ])
]);
