import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, ViewPort } from '@models/index';
import { ApiService, AuthService, MessageService, ToasterService } from '@services/core';
import { ViewPortService, UserService } from '@services/common/index';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    // tslint:disable:variable-name
    /* tslint:disable:no-string-literal */
    viewPort = new ViewPort();
    submitted = false;
    loginForm: FormGroup;
    hide = true;
    private _user: User;
    private _subscription = new Subscription();
    readonly sender = 'LOGIN';

    constructor(private router: Router,
                private viewportService: ViewPortService,
                private fb: FormBuilder,
                private apiService: ApiService,
                private authService: AuthService,
                private messageService: MessageService,
                private userService: UserService,
                private toastService: ToasterService) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });

        this._subscription.add(
            this.viewportService.viewportLayout$.subscribe(viewport => {
                this.viewPort = viewport;
            })
        );

        this._subscription.add(
            this.toastService.toast$.subscribe(sender => {
                if (sender === this.sender && this._user) {
                    switch ( this._user.role ) {
                        case 'admin':
                            this.router.navigate(['/admin'], {
                                queryParams: { page: 1, limit: this.apiService.pageSize }
                            });
                            break;

                        case 'user':
                            this.router.navigate(['/users', `${this._user.id}`]);
                            break;
                    }
                }
            })
        );
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    getErrorMessage() {
        const email = this.loginForm.get('email');
        if (email.hasError('required')) {
            return 'You must enter a value';
        }

        return email.hasError('email') ? 'Not a valid email' : '';
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        const formvalue = this.loginForm.value;
        const userOptions = {
            email: formvalue.email,
            password: formvalue.password,
        };

        this._subscription.add(
            this.apiService.login(userOptions)
                .subscribe(res => {
                    this._user = res['data'] as User;
                    const token = res['token'];

                    this.messageService.sendMessage({
                        message: 'Login Successful',
                        error: false,
                        sender: this.sender
                    });

                    this.authService.setToken(token);
                    this.userService.broadcastUser(this._user);
                    this.userService.setRole(this._user.role);
                }
            )
        );
    }

    forgotPassHandler() {
        this._subscription.add(
            this.apiService.forgotPassword(this._user.email).subscribe(res => {
                console.log(res);
            })
        );
    }
}
