import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '@services/common';
import { DocumentComponent } from '@components/user';
import { DialogService } from '@services/core/dialog.service';

@Injectable({
    providedIn: 'root'
})
export class DocumentGuard implements CanActivateChild {

    constructor(private userService: UserService, private dialogService: DialogService) {}

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.userService.getUser();

        if ( user && user.user_profile ) {
            return true;
        }

        if ( next.component === DocumentComponent ) {
            return this.dialogService.openDialog('DOCUMENT');
        }
        return true;
    }
}
