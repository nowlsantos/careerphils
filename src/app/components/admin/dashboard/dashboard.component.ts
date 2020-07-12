import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { User } from '@models/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
    private subscription = new Subscription();

    @Input() users: User[];
    photoUrl: string;

    /* tslint:disable:no-string-literal */
    constructor() { }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
