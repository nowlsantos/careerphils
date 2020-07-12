import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ApiService } from '@services/core';
import { map, filter } from 'rxjs/operators';
import { User } from '@models/user.model';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
    // tslint:disable:variable-name
    private _subscription = new Subscription();

    users: User[];

    /* tslint:disable:no-string-literal */
    constructor(private route: ActivatedRoute,
                private apiService: ApiService) {}

    ngOnInit() {
        this._subscription.add(
            this.route.data
                .pipe( map(response => response['users'].data as User[]) )
                .subscribe(users => {
                    this.users = users.filter(user => user.role !== 'admin');
                }
            )
        );
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    showAllUsers() {
    }
}
