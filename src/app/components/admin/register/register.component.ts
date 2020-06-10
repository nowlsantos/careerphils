import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService,
         AuthService,
         ViewPortService } from '@services/index';
import { User, ViewPort } from '@models/index';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    viewPort = new ViewPort();
    returnUrl: string;
    hide = true;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private viewportService: ViewPortService,
                private apiService: ApiService,
                private authService: AuthService) { }

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(viewport => {
            this.viewPort = viewport;
        });

        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    getErrorMessage() {
        const email = this.registerForm.get('email');
        if (email.hasError('required')) {
            return 'You must enter a value';
        }

        return email.hasError('email') ? 'Not a valid email' : '';
    }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        const formvalue = this.registerForm.value;
        const user: User = {
            email: formvalue.email,
            password: formvalue.password,
        };

        this.apiService.register(user).subscribe(res => {
            const token = JSON.stringify(res);
            this.authService.setToken(token);
            this.router.navigate(['../login'], { relativeTo: this.route });
        });
    }
}
