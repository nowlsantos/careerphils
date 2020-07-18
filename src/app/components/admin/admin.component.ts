import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    // tslint:disable:variable-name

    /* tslint:disable:no-string-literal */
    constructor(private router: Router,
                private apiService: ApiService) { }

    ngOnInit() {}

    // getUsers
    getAllUsers() {
        this.router.navigate(['/admin'], {
            queryParams: { page: 1, limit: this.apiService.pageSize }
        });
    }

    onEnterSearch(term: string) {
        if ( !term || term === '' ) {
            return;
        }
        this.router.navigate(['/admin/profiles'], {
            queryParams: {
                search: term
            }
        });
    }

    onUserSearch(value: string) {
        this.onEnterSearch(value);
    }
}
