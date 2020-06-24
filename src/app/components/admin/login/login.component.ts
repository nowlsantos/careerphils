import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, ViewPort } from '@models/index';
import { ApiService,
         AuthService,
         ViewPortService,
         LoginService,
         MessageService,
         UserService,
         ToasterService
        } from '@services/common/index';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    viewPort = new ViewPort();
    submitted = false;
    loginForm: FormGroup;
    hide = true;
    private sender = 'LOGIN';
    private user: User;
    private subs = new SubSink();

    constructor(private router: Router,
                private viewportService: ViewPortService,
                private fb: FormBuilder,
                private apiService: ApiService,
                private authService: AuthService,
                private loginService: LoginService,
                private userService: UserService,
                private messageService: MessageService,
                private toastService: ToasterService) { }

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(viewport => {
            this.viewPort = viewport;
        });

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });

        this.subs.add(
            this.toastService.toast$.subscribe(sender => {
                if ( sender === this.sender && this.user ) {
                    this.router.navigate([`../users/${this.user.id}`]);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
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
        if ( this.loginForm.invalid ) {
            return;
        }

        const formvalue = this.loginForm.value;
        const user: User = {
            email: formvalue.email,
            password: formvalue.password,
        };

        this.apiService.login(user)
            .subscribe(res => {
                /* tslint:disable:no-string-literal */
                this.user = res['data'];

                this.messageService.sendMessage({
                    message: 'Login Successful',
                    error: false,
                    sender: this.sender
                });

                this.userService.broadcastUser(this.user);
                this.authService.setToken(res['token']);
                this.loginService.broadcastLogin(true);
            }
        );
    }
}
