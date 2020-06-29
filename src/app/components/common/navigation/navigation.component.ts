import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, AuthService, UserService, ProfileService} from '@services/common/index';
import { SubSink } from 'subsink';
import { User } from '@models/user.model';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
    private subs = new SubSink();

    @Output() opened = new EventEmitter<boolean>();
    user: User;
    isHandset = false;
    isLoggedIn = false;
    cpLogo = '../../../../assets/logo/cplogo.png';
    userPhoto: string;
    firstName: string;

    constructor(private router: Router,
                private apiService: ApiService,
                private authService: AuthService,
                private userService: UserService,
                private profileService: ProfileService) { }

    ngOnInit() {
        this.subs.add(
            this.userService.user$.subscribe(user => {
                if ( user ) {
                    this.user = user;
                    !this.isLoggedIn ? this.userPhoto = `../../../assets/users/${user.photo}`
                                     : this.userPhoto = `/assets/users/${user.photo}`;
                }
            }),

            this.profileService.profile$.subscribe(profile => {
                if ( profile ) {
                    this.firstName = profile.firstname.toUpperCase();
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
            this.isLoggedIn = false;
            this.user = null;
            this.firstName = null;
            this.router.navigate(['/home']);
        });
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    open(flag: boolean) {
        this.opened.emit(flag);
    }
}
