import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, ViewPort } from '@models/index';
import { ApiService,
         AuthService,
         ViewPortService,
         LoginService } from '@services/index';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;
    viewPort = new ViewPort();
    returnUrl: string;
    hide = true;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private viewportService: ViewPortService,
                private apiService: ApiService,
                private authService: AuthService,
                private loginService: LoginService,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(viewport => {
            this.viewPort = viewport;
        });

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });

        /* tslint:disable:no-string-literal */
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
                const token = JSON.stringify(res);
                this.authService.setToken(token);
                this.loginService.broadcastLogin(true);
                this.router.navigate([this.returnUrl]);
            }
        );
    }
}
