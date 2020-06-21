import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    passwordForm: FormGroup;
    hide = true;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.passwordForm = this.fb.group({
            currentpass: ['', Validators.required ],
            newpass: ['', Validators.required],
            confirmpass: ['', Validators.required]
        });
    }

    onSubmit() {

    }

}
