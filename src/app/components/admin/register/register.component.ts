import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService,
         AuthService,
         ViewPortService,
         UserService,
         MessageService,
         ToasterService
        } from '@services/common/index';
import { User, ViewPort } from '@models/index';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    submitted = false;
    returnUrl: string;
    hide = true;
    viewPort = new ViewPort();
    private sender = 'REGISTER';
    private subs = new SubSink();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private viewportService: ViewPortService,
                private apiService: ApiService,
                private authService: AuthService,
                private userService: UserService,
                private messageService: MessageService,
                private toastService: ToasterService) { }

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(viewport => {
            this.viewPort = viewport;
        });

        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.subs.add(
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

    getErrorMessage() {
        const email = this.registerForm.get('email');
        if ( email.hasError('required') ) {
            return 'You must enter a value';
        }

        return email.hasError('email') ? 'Not a valid email address' : '';
    }

    onSubmit() {
        this.submitted = true;
        if ( this.registerForm.invalid ) {
            return;
        }

        const formvalue = this.registerForm.value;
        const user: User = {
            email: formvalue.email,
            password: formvalue.password,
        };

        this.apiService.register(user).subscribe(res => {
            /* tslint:disable:no-string-literal */
            user.photo = res['data'].photo;
            user.createdAt = res['data'].createdAt;

            this.userService.broadcastUser(user);
            this.messageService.sendMessage({
                message: 'Registration successful',
                error: false,
                sender: this.sender
            });
            this.authService.setToken(res['token']);
        });
    }
}
