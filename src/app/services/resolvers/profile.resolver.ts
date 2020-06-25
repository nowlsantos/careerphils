import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService, UserService } from '@services/common/';
import { map, switchMap } from 'rxjs/operators';
import { Profile } from '@models/index';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<Profile> {

    constructor(private apiService: ApiService,
                private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /* tslint:disable:no-string-literal */
        const user = this.userService.getUser();

        if ( user ) {
            return this.apiService.getUsers().pipe(
                map( users => users['data'].filter(item => item.id === user.id)),
                switchMap(result => {
                    // console.log('Resolve Profile::', result[0].user_profile);
                    if ( result[0].user_profile ) {
                        const profileId = (result[0].user_profile)._id;
                        return this.apiService.getProfile(profileId);
                    }
                    return of(null);
                })
            );
        }

        return of(null);
    }
}
