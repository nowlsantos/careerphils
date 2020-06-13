import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    userForm: FormGroup;
    hasPhoto = true;
    hasProfile = false;
    fullname = 'Noel P. Santos';

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.userForm = this.fb.group({
            // email: ['', [Validators.required, Validators.email]],
            // password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    uploadPhoto() {
        console.log('Uploading photo...');
    }

    onSubmit() {
        /* this.submitted = true;
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
        }); */
    }
}
