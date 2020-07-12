import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProfileComponent } from '@components/user';
import { DialogService } from '@services/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileGuard implements CanDeactivate<ProfileComponent> {
    constructor(private dialogService: DialogService) {}

    canDeactivate(component: ProfileComponent): Observable<boolean> | Promise<boolean> | boolean {
        if ( component.isDirty() ) {
            return this.dialogService.openDialog('PROFILE');
        }
        return true;
    }
}
