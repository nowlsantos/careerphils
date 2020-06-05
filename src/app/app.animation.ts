import { animate, animateChild, group, query as q, style, transition, trigger } from '@angular/animations';
const query = (s, a, o = { optional: true }) => q(s, a, o);

export const routeAnimation = trigger('routeAnimation', [
    transition('* => *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' })),
        query(':enter', style({ transform: 'translateX(100%)' })),

        group([
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                // animate('1.0s ease-in-out', style({transform: 'translateX(-100%)'}))
                animate('0.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
            ]),
            query(':enter', [
                // animate('1.0s ease-in-out', style({transform: 'translateX(0%)'})),
                animate('0.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' })),
                animateChild()
            ])
        ]),
    ]),
]);
