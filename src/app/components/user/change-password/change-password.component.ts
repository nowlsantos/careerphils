import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@models/user.model';
import { ApiService, MessageService, ToasterService } from '@services/common/';
import { SubSink } from 'subsink/dist/subsink';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
    passwordForm: FormGroup;
    hide = true;
    readonly sender = 'CHANGE_PASSWORD';
    private subs = new SubSink();

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

        this.subs.add(
            this.toastService.toast$.subscribe(sender => {
                if ( sender === this.sender ) {
                    this.router.navigate(['../dashboard'], { relativeTo: this.route });
                }
            })
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    onSubmit() {
        if ( this.passwordForm.invalid ) {
            return;
        }

        const formvalue = this.passwordForm.value;
        const user: User = {
            currentPassword: formvalue.currentpass,
            password: formvalue.newpass,
            confirmPassword: formvalue.confirmpass
        };

        this.subs.add(
            this.apiService.updatePassword(user).subscribe( _ => {
                this.messageService.sendMessage({
                    message: 'Password has been changed',
                    error: false,
                    sender: this.sender
                });
            })
        );
    }
}
