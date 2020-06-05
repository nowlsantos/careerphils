import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewPort } from 'src/app/services/models/viewport.model';
import { ViewPortService } from 'src/app/services/viewport.service';
import { User } from '../../services/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

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

    constructor(private router: Router,
                private route: ActivatedRoute,
                private viewportService: ViewPortService,
                private apiService: ApiService,
                private authService: AuthService,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(viewport => {
            this.viewPort = viewport;
        });

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });

        /* tslint:disable:no-string-literal */
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
                    this.router.navigate([this.returnUrl]);
                }
            );
    }
}
