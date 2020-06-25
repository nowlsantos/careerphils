import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { User, Profile } from '@models/index';
import { ApiService, MessageService, ToasterService, UserService } from '@services/common/index';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
    // tslint:disable:no-trailing-whitespace
    /* tslint:disable:no-string-literal */

    userForm: FormGroup;
    profile: Profile;
    submitted = false;

    private subs = new SubSink();
    private sender = 'PROFILE';
    private user: User;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private apiService: ApiService,
                private userService: UserService,
                private messageService: MessageService,
                private toastService: ToasterService) {}

    ngOnInit() {
        this.subs.add(
            this.userService.user$.subscribe(user => {
                if ( user ) {
                    this.user = user;
                }
            }),

            this.toastService.toast$.subscribe(sender => {
                if ( sender === this.sender ) {
                    this.router.navigate(['../profile'], { relativeTo: this.route });
                }
            }),
        );
        
        if ( !this.user.hasProfile ) {
            this.subs.add(
                this.route.data.subscribe(result => {
                    if ( result && result['profile'] ) {
                        this.user.profile = result['profile'].data as Profile;
                        this.user.hasProfile = true;
                    } else {
                        this.user.profile = this.resetProfile();
                    }
                })
            )
        }
        
        this.initializeForm(this.user.profile);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    
    private initializeForm(profile: Profile) {
        this.userForm = this.fb.group({
            firstname: [profile.firstname, Validators.required],
            lastname: [profile.lastname, Validators.required],
            email: [profile.email, Validators.required],
            phone: [profile.phone, Validators.required],
            location: [profile.location, Validators.required],
            position: [profile.position, Validators.required],
            birthdate: [profile.birthdate, Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;
        if ( this.userForm.invalid ) {
            return;
        }

        const fv = this.userForm.value;
        const profile: Profile = {
            userId: this.user.id,
            firstname: fv.firstname,
            lastname: fv.lastname,
            email: fv.email,
            phone: fv.phone,
            location: fv.location,
            position: fv.position,
            birthdate: fv.birthdate
        };

        this.apiService.addProfile(profile, this.user.id).subscribe(response => {
            if ( response ) {
                this.messageService.sendMessage({
                    message: 'Profile successfully created',
                    error: false,
                    sender: this.sender
                });
            }
        });
    }

    private resetProfile(): Profile {
        const profile: Profile = {
            userId: this.user.id,
            firstname: '',
            lastname: '',
            email: this.user.email,
            phone: '',
            location: '',
            position: '',
            birthdate: ''
        };
        return profile;
    }

    onReset() {
        this.resetProfile();
        this.router.navigate(['../dashboard'], { relativeTo: this.route });
        // this.userForm.reset();
    }
}
