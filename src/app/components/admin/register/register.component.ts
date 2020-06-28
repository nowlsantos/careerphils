import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService,
         AuthService,
         ViewPortService,
         MessageService,
         ToasterService
        } from '@services/common/index';
import { User, ViewPort } from '@models/index';
import { SubSink } from 'subsink';
import { PasswordValidatorc } from '../password.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    returnUrl: string;
    hide = true;
    viewPort = new ViewPort();
    readonly sender = 'REGISTER';
    private subs = new SubSink();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private viewportService: ViewPortService,
                private apiService: ApiService,
                private authService: AuthService,
                private messageService: MessageService,
                private toastService: ToasterService) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        }, {validator: PasswordValidatorc});

        this.subs.add(
            this.viewportService.viewportLayout$.subscribe(viewport => {
                this.viewPort = viewport;
            }),

            this.toastService.toast$.subscribe(sender => {
                if ( sender === this.sender ) {
                    this.router.navigate(['../login'], { relativeTo: this.route });
                }
            })
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    validateEmail(email) {
        // tslint:disable-next-line:max-line-length
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    getEmailErrorMessage() {
        const email = this.registerForm.get('email');
        if ( email.hasError('required') ) {
            return 'You must enter a value';
        }

        return email.hasError('email') ? 'Not a valid email address' : '';
    }

    getConfirmPasswordErrorMessage() {
        const confirmPassword = this.registerForm.get('confirmPassword');
        if ( confirmPassword.hasError('required') ) {
            return 'You must enter a value';
        }

        return confirmPassword.hasError('confirmPassword') ? 'Password do not match' : '';
    }

    onSubmit() {
        if ( this.registerForm.invalid ) {
            return;
        }

        const formvalue = this.registerForm.value;
        const user: User = {
            email: formvalue.email,
            password: formvalue.password,
            confirmPassword: formvalue.confirmPassword
        };

        this.apiService.register(user).subscribe(res => {
            // user.photo = res['data'].photo;
            // user.createdAt = res['data'].createdAt;

            this.messageService.sendMessage({
                message: 'Registration successful. Welcome to CareerPhils!',
                error: false,
                sender: this.sender
            });

            /* tslint:disable:no-string-literal */
            this.authService.setToken(res['token']);
        });
    }
}
