import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService,
         AuthService,
         LoginService,
         UserService} from '@services/index';
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

    constructor(private router: Router,
                private apiService: ApiService,
                private authService: AuthService,
                private loginService: LoginService,
                private userService: UserService) { }

    ngOnInit() {
        this.subs.add(
            this.loginService.login$.subscribe(login => {
                if ( login ) {
                    this.isLoggedIn = login;
                }
            }));

        this.subs.add(
            this.userService.user$.subscribe(user => {
                if ( user ) {
                    this.user = user;
                    !this.isLoggedIn ? this.userPhoto = `../../../assets/users/${user.photo}`
                                     : this.userPhoto = `/assets/users/${user.photo}`;
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
            this.user = null;
            this.isLoggedIn = false;
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
