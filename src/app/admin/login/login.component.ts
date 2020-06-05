import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewPort } from 'src/app/services/models/viewport.model';
import { ViewPortService } from 'src/app/services/viewport.service';
import { User } from '../../services/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;
    viewPort = new ViewPort();

    constructor(private router: Router,
                private viewportService: ViewPortService,
                private apiService: ApiService,
                private tokenService: TokenService,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(viewport => {
            this.viewPort = viewport;
        });

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
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
                    this.tokenService.setToken(token);
                    this.router.navigate(['/login']);
                }
            );
    }
}
