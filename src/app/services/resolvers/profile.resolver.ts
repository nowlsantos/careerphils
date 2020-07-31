import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '@services/common/';
import { first } from 'rxjs/operators';
import { Profile } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<Profile[]> {

    constructor(private apiService: ApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any | Profile[]> {
        const searchterm = route.queryParamMap.get('search');
        return this.apiService.getProfiles(searchterm).pipe(first());
    }
}
