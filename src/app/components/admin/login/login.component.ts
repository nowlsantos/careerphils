import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, ViewPort } from '@models/index';
import { ApiService,
         AuthService,
         ViewPortService,
         LoginService,
         MessageService,
         UserService
        } from '@services/index';
import { timer } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    viewPort = new ViewPort();
    submitted = false;
    loginForm: FormGroup;
    hide = true;

    constructor(private router: Router,
                private viewportService: ViewPortService,
                private fb: FormBuilder,
                private apiService: ApiService,
                private authService: AuthService,
                private loginService: LoginService,
                private userService: UserService,
                private messageService: MessageService) { }

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(viewport => {
            this.viewPort = viewport;
        });

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
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
                const newUser = res['data'];
                this.userService.broadcastUser(newUser);
                this.messageService.sendMessage({
                    message: 'Login Successful',
                    error: false
                });
                this.authService.setToken(res['token']);
                this.loginService.broadcastLogin(true);

                const source = timer(2000);
                source.subscribe( (_) => {
                    this.router.navigate([`../users/${newUser.id}`]);
                });
            }
        );
    }
}
