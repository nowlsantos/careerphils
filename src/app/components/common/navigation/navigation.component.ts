import { Component, Output, EventEmitter, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, AuthService} from '@services/core';
import { UserService } from '@services/common/user.service';
import { User } from '@models/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
    // tslint:disable:variable-name
    private _subscription = new Subscription();
    @Output() opened = new EventEmitter<boolean>();

    user: User;
    isHandset = false;
    isLoggedIn = false;
    cpLogo = './assets/logo/cplogo.png';
    userPhoto: string;
    firstName: string;

    constructor(private router: Router,
                private apiService: ApiService,
                private authService: AuthService,
                private userService: UserService) { }

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn();

        this._subscription.add(
            this.userService.user$.subscribe(user => {
                if ( user ) {
                    this.user = user;
                    user.photo.startsWith('default') ? user.photo = `./assets/users/${user.photo}`
                                                     : user.photo = `${user.photo}`;

                    if ( this.user.profile ) {
                        const profile = this.user.profile;
                        this.firstName = profile.firstname.toUpperCase();
                    }
                }
            })
        );
    }

    onLogoClick() {
        this.router.navigate(['/home']);
    }

    onUserClick() {
        this.router.navigate([`../users/${this.user.id}`]);
    }

    onLogout() {
        this.apiService.logout().subscribe( () => {
            this.authService.logout();
            this.userService.removeRole();
            this.isLoggedIn = this.authService.isLoggedIn();
            this.user = null;
            this.firstName = null;
            this.router.navigate(['/home']);
        });
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    open(flag: boolean) {
        this.opened.emit(flag);
    }
}
