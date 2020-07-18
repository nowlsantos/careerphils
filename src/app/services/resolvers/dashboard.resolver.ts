import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/core/api.service';
import { UserService } from '@services/common';
import { User } from '@models/index';

@Injectable({
    providedIn: 'root'
})
export class DashboardResolver implements Resolve<User[]> {
    constructor(private apiService: ApiService,
                private userService: UserService) { }

    /* tslint:disable:no-string-literal */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any | User[]> {
        const pageIndex = route.queryParamMap.get('page');
        // console.log('USER RESOLVE::', pageIndex);
        return this.apiService.getAllUsers()
            .pipe(switchMap(users => {
                this.userService.setAllUsers(users['data'] as User[]);
                this.apiService.pageLength = +users['count'];
                return this.apiService.getUsers(pageIndex, ).pipe(first());
            })
        );
    }
}
