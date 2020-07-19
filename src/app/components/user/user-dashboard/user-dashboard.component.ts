import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '@services/common';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
    // tslint:disable:no-trailing-whitespace
    /* tslint:disable:no-string-literal */
    private subscription = new Subscription();

    constructor(private userService: UserService) { }

    ngOnInit() {
        /* this.subscription.add(
            this.userService.user$.subscribe(user => {
                console.log('DASHBOARD SUBS::', user);
            })
        ); */
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
