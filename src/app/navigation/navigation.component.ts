import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ViewPortService } from 'src/app/services/viewport.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
    private subs = new SubSink();

    @Output() opened = new EventEmitter<boolean>();
    isHandset = false;
    displayName: string;

    constructor(private viewportService: ViewPortService,
                private router: Router) { }

    ngOnInit() {
        this.subs.add(
            this.viewportService.viewportLayout$.subscribe(handSet => {
                this.isHandset = handSet.isHandset;
                // console.log(this.isHandset);
            })
        );

        /* this.subs.add(
            this.authService.user$.subscribe(user => {
                if (user) {
                    this.displayName = user.displayName;
                }
            })
        ); */

        /* this.subs.add(
            this.loginService.login$.subscribe(isLoggedIn => {
                // console.log('LoginService::logged- ', isLoggedIn);
                if (!isLoggedIn) {
                    this.displayName = 'Friend';
                }
            })
        ); */
    }

    onLogoClick() {
        this.router.navigate(['/home']);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    open(flag: boolean) {
        this.opened.emit(flag);
    }
}