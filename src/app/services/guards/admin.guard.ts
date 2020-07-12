import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { AuthService, MessageService } from '@services/core';
import { Observable } from 'rxjs';
import { state } from '@angular/animations';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanLoad, CanActivateChild {
    constructor(private authService: AuthService, private messageService: MessageService) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return false;
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        /* const user = this.userService.getUser();

        if ( next.component === DocumentComponent ) {
            if ( user && user.user_profile ) {
                return true;
            }

            this.messageService.sendMessage({
                message: 'You need to create your profile first before you can upload a document',
                error: true,
                sender: 'ADMIN_GUARD',
                duration: 4000
            });
            return false;
        } */

        return true;
    }
}
