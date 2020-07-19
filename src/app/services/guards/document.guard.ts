import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService, DialogService } from '@services/common/index';
import { DocumentComponent } from '@components/user';

@Injectable({
    providedIn: 'root'
})
export class DocumentGuard implements CanActivateChild {

    constructor(private userService: UserService, private dialogService: DialogService) {}

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.userService.getUser();
        if ( user && user.profile ) {
            return true;
        }

        if ( next.component === DocumentComponent ) {
            return this.dialogService.openGuardDialog('DOCUMENT');
        }

        return true;
    }
}
