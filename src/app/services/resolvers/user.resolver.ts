import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '@models/user.model';
import { ApiService } from '@services/common/api.service';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

    constructor(private apiService: ApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.paramMap.get('id');
        // console.log('ID resolver::', id);
        return this.apiService.getUser(id);
    }
}