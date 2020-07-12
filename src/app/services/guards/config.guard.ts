import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserComponent } from '@components/user/user.component';

@Injectable({
    providedIn: 'root'
})
export class ConfigGuard implements CanActivate, CanDeactivate<unknown> {
    private userComponent = UserComponent.getUserComponent();

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.userComponent.setRoute('');
        console.log('canAactivate');
        const routes = next.routeConfig.children;
        if ( routes[0].path === '' ) {
            routes[0].redirectTo = this.userComponent.getRoute();
            routes[0].pathMatch = 'full';
        }
        return true;
    }

    canDeactivate(component: unknown, currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot) {

        console.log('canDeactivate');
        return true;
    }
}
