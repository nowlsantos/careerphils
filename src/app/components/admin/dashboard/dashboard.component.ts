import { Component, OnInit } from '@angular/core';
import { User, Profile } from '@models/index';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '@services/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    // tslint:disable:variable-name
    totalSize: number;
    pageSize: string;
    isActiveUser: boolean;

    user$: Observable<User[]>;
    profile$: Observable<Profile[]>;

    /* tslint:disable:no-string-literal */
    constructor(private route: ActivatedRoute,
                private router: Router,
                private apiService: ApiService) { }

    ngOnInit() {
        // ---The limit of users to be displayed ---
        this.pageSize = this.apiService.pageSize;

        // --- The total number of users ----
        this.totalSize = this.apiService.totalUsers;

        const url = this.router.routerState.snapshot.url.split('?')[0];
        this.isActiveUser = url.endsWith('/admin');

        this.isActiveUser ? this.user$ = this.route.data.pipe( map(response => response['users'].data as User[]) )
                          : this.profile$ = this.route.data.pipe( map(response => response['profiles'].data as Profile[]) );
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
