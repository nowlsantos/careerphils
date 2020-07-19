import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { DialogService } from '@services/common/dialog.service';
import { ProfileComponent } from '@components/user';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanDeactivate<ProfileComponent> {

    constructor(private dialogService: DialogService) {}

    canDeactivate(component: ProfileComponent): Observable<boolean> | Promise<boolean> | boolean {
        if ( component.isDirty() ) {
            return this.dialogService.openGuardDialog('PROFILE');
        }
        return true;
    }
}
