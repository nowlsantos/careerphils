import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, share, tap } from 'rxjs/operators';
import { ViewPort } from './services/models/viewport.model';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { ViewPortService } from './services/viewport.service';
import { SubSink } from 'subsink';
import { routeAnimation } from './app.animation';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ErrorService } from './services/error.service';
import { LoginService } from './admin/services/login.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [routeAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
    isHandset = false;
    isLoggedIn = false;

    private subs = new SubSink();
    @ViewChild(MatSidenavContainer, { static: false }) sidenavContainer: MatSidenavContainer;
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

    hposition: MatSnackBarHorizontalPosition = 'center';
    vposition: MatSnackBarVerticalPosition = 'top';

    private viewPort = new ViewPort();
    private layoutChanges$ = this.breakpointObserver.observe(
        [
            Breakpoints.Handset,
            Breakpoints.Tablet,
            Breakpoints.Web,
        ]
    ).pipe(
        // tap(value => console.log(value)),
        map(result => result.matches),
        share()
    );

    constructor(private breakpointObserver: BreakpointObserver,
                private viewportService: ViewPortService,
                private errorService: ErrorService,
                private loginService: LoginService,
                private apiService: ApiService,
                private authService: AuthService,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.onLayoutChange();

        this.subs.add(
            this.errorService.message$.subscribe(message => {
                if ( message ) {
                    this.openSnackbar(message);
                    // console.log('APP ERROR::', message);
                }
            })
        );

        this.subs.add(
            this.loginService.login$.subscribe(loggedIn => {
                if ( loggedIn ) {
                    this.isLoggedIn = loggedIn;
                    console.log('LOGGEDIN::', this.isLoggedIn);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    private onLayoutChange() {
        this.subs.add(
            this.layoutChanges$.subscribe(result => {
                switch (result) {
                    case this.breakpointObserver.isMatched('(max-width: 599.99px) and (orientation: portrait)'):
                        this.isHandset = true;
                        this.viewPort.device = 'mobile';
                        this.viewPort.orientation = 'portrait';
                        break;

                    case this.breakpointObserver.isMatched('(max-width: 599.99px) and (orientation: landscape)'):
                        this.isHandset = false;
                        this.viewPort.device = 'mobile';
                        this.viewPort.orientation = 'landscape';
                        break;

                    /* For normal device res */
                    case this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)'):

                    /* For high res like the ipad pro  */
                    case this.breakpointObserver.isMatched('(min-width: 840px) and (orientation: portrait)'):
                        this.isHandset = false;
                        this.viewPort.device = 'tablet';
                        this.viewPort.orientation = 'portrait';
                        break;

                    case this.breakpointObserver.isMatched('(max-width: 959.99px) and (orientation: landscape)'):
                    case this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 959.99px) and (orientation: landscape)'):
                        this.viewPort.device = 'tablet';
                        this.viewPort.orientation = 'landscape';
                        this.isHandset = false;
                        break;

                    case this.breakpointObserver.isMatched('(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)'):
                    case this.breakpointObserver.isMatched('(min-width: 1280px) and (orientation: landscape)'):
                        // default:
                        this.viewPort.device = 'web';
                        this.viewPort.orientation = 'landscape';
                        this.isHandset = false;
                        break;
                }
                this.viewPort.isHandset = this.isHandset;
                this.viewportService.broadcastLayout(this.viewPort);
                // console.log(this.breakpointObserver);
                // console.log(this.viewPort);
            })
        );
    }

    getState(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
    }

    closeSideNav() {
        this.apiService.logout().subscribe( () => {
            // console.log('SideNav Logout::');
            this.authService.logout();
            this.loginService.broadcastLogin(false);
            // this.router.navigate(['/home']);
            this.sidenav.close();
        });
    }

    openSnackbar(message: string) {
        this.snackBar.open(message, '', {
            duration: 4000,
            horizontalPosition: this.hposition,
            verticalPosition: this.vposition
        });
    }
}
