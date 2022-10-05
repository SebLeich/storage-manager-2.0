import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

export const showListAnimation = trigger('showList', [
    transition('* => *', [ // each time the binding value changes
        query(':enter', [
            style({ opacity: 0 }),
            stagger(10, [
                animate('0.1s', style({ opacity: 1 }))
            ])
        ], {
            optional: true
        })
    ])
]);
