import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService, UserService } from '@services/common/';
import { Profile } from '@models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<Profile> {

    constructor(private apiService: ApiService,
                private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const id = route.paramMap.get('id');
        // const user = this.userService.getUser();
        // const profileId = user.profileId;
        // console.log('Resolve ProfileID::', profileId);

        /* if ( profileId ) {
            return this.apiService.getProfile(profileId);
        } */

        return null;
    }
}
