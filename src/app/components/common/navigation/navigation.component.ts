import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService,
         AuthService,
         LoginService,
         ViewPortService } from '@services/index';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
    private subs = new SubSink();

    @Output() opened = new EventEmitter<boolean>();
    isLoggedIn = false;
    isHandset = false;
    displayName: string;

    constructor(private router: Router,
                private viewportService: ViewPortService,
                private apiService: ApiService,
                private authService: AuthService,
                private loginService: LoginService) { }

    ngOnInit() {
        /* this.subs.add(
            this.viewportService.viewportLayout$.subscribe(handSet => {
                this.isHandset = handSet.isHandset;
            })
        ); */

        this.subs.add(
            this.loginService.login$.subscribe(loggedIn => {
                if ( loggedIn) {
                    this.isLoggedIn = loggedIn;
                }
            })
        );
    }

    onLogoClick() {
        this.router.navigate(['/home']);
    }

    onLogout() {
        this.apiService.logout().subscribe( () => {
            console.log('Navigation Logout::');
            this.authService.logout();
            this.isLoggedIn = false;
            // this.loginService.broadcastLogin(false);
            // this.router.navigate(['/home']);
        });
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    open(flag: boolean) {
        this.opened.emit(flag);
    }
}