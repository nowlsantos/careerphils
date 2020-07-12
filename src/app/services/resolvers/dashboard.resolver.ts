import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '@models/user.model';
import { ApiService } from '@services/core/api.service';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardResolver implements Resolve<User[]> {

    constructor(private apiService: ApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any | User[]> {
        return this.apiService.getUsers().pipe(first());
    }
}
