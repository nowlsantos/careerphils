import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, MessageService, ToasterService } from '@services/core/';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
    passwordForm: FormGroup;
    hide = true;
    readonly sender = 'CHANGE_PASSWORD';
    private subscription = new Subscription();

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private apiService: ApiService,
                private messageService: MessageService,
                private toastService: ToasterService) { }

    ngOnInit() {
        this.passwordForm = this.fb.group({
            currentpass: ['', Validators.required ],
            newpass: ['', Validators.required],
            confirmpass: ['', Validators.required]
        });

        this.subscription.add(
            this.toastService.toast$.subscribe(sender => {
                if ( sender === this.sender ) {
                    this.router.navigate(['../dashboard'], { relativeTo: this.route });
                }
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        if ( this.passwordForm.invalid ) {
            return;
        }

        const formvalue = this.passwordForm.value;
        const passOptions = {
            currentPassword: formvalue.currentpass,
            password: formvalue.newpass,
            confirmPassword: formvalue.confirmpass
        };

        this.subscription.add(
            this.apiService.updatePassword(passOptions).subscribe( _ => {
                this.messageService.sendMessage({
                    message: 'Password has been changed',
                    error: false,
                    sender: this.sender
                });
            })
        );
    }

    isDirty() {
        return this.passwordForm.dirty;
    }

    onReset() {
        this.passwordForm.reset();
    }
}
