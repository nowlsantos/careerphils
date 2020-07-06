import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, ViewPort } from '@models/index';
import {
    ApiService,
    AuthService,
    ViewPortService,
    MessageService,
    UserService,
    ToasterService
} from '@services/common/index';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    /* tslint:disable:no-string-literal */
    viewPort = new ViewPort();
    submitted = false;
    loginForm: FormGroup;
    hide = true;
    readonly sender = 'LOGIN';
    private user: User;
    private subscription = new Subscription();

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

        this.subscription.add(
            this.viewportService.viewportLayout$.subscribe(viewport => {
                this.viewPort = viewport;
            })
        );

        this.subscription.add(
            this.toastService.toast$.subscribe(sender => {
                if (sender === this.sender && this.user) {
                    this.router.navigate([`../users/${this.user.id}`]);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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

        this.subscription.add(
            this.apiService.login(userOptions)
                .subscribe(res => {
                    this.user = res['data'] as User;
                    const token = res['token'];

                    this.messageService.sendMessage({
                        message: 'Login Successful',
                        error: false,
                        sender: this.sender
                    });

                    this.authService.setToken(token);
                    this.userService.broadcastUser(this.user);
                }
            )
        );
    }

    forgotPassHandler() {
        this.subscription.add(
            this.apiService.forgotPassword(this.user.email).subscribe(res => {
                console.log(res);
            })
        );
    }
}
