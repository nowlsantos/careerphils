import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '@services/common';
import { User } from '@models/user.model';
import { map, filter } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
    private subscription = new Subscription();
    users: User[] = [];
    photoUrl: string;

    /* tslint:disable:no-string-literal */
    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.subscription.add(
            this.apiService.getUsers()
            .pipe(map(response => response['data'] as User[]))
            .subscribe(result => {
                result.forEach(user => {
                    if ( user.role !== 'admin' ) {
                        user.photo.startsWith('default') ? user.photo = `./assets/users/${user.photo}`
                                                         : user.photo = `${user.photo}`;

                        this.users = [...this.users, user];
                    }
                });
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
