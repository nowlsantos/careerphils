import { Component, OnInit } from '@angular/core';
import { User, Profile } from '@models/index';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '@services/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    // tslint:disable:variable-name
    users: User[];
    profiles: Profile[];
    pageLength: number;
    pageSize = '2';
    isActiveUser: boolean;

    /* tslint:disable:no-string-literal */
    constructor(private route: ActivatedRoute,
                private router: Router,
                private apiService: ApiService) { }

    ngOnInit() {
        // --- The total number of users ----
        this.pageLength = this.apiService.pageLength;

        // ---The limit of users to be displayed ---
        this.apiService.pageSize = this.pageSize;

        const url = this.router.routerState.snapshot.url.split('?')[0];
        this.isActiveUser = url.endsWith('/admin');

        if ( this.isActiveUser ) {
            this.route.data
                .pipe( map(response => response['users'].data as User[]) )
                .subscribe(users => {
                    this.users = users;
                }
            );
        } else {
            this.route.data
            .pipe( map(response => response['profiles'].data as Profile[]) )
            .subscribe(profiles => {
                this.pageLength = profiles.length;
                this.profiles = profiles;
            });
        }
    }

    pageChangeEvent(paginator: MatPaginator) {
        const _page = paginator.pageIndex + 1;

        this.router.navigate(['/admin'], {
            queryParams: {
                page: _page,
                limit: this.pageSize
            }
        });
    }

    /* setPageSizeOptions(options: string) {
        if ( options ) {
            this.pageSizeOptions = options.split(',').map(str => +str);
        }
    } */
}
