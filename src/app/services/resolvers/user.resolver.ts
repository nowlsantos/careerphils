import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '@models/user.model';
import { ApiService } from '@services/common/api.service';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
    /* tslint:disable:no-string-literal */
    constructor(private apiService: ApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.paramMap.get('id');
        return this.apiService.getUser(id).pipe(first());
    }
}
