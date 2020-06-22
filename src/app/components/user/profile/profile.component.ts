import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { User, Profile } from '@models/index';
import { UserService, ApiService, MessageService, ProfileService, ToasterService } from '@services/common/index';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    userForm: FormGroup;
    hasProfile = false;
    submitted = false;

    private subs = new SubSink();
    private user: User;
    private profile: Profile;
    private sender = 'PROFILE';

    constructor(private fb: FormBuilder,
                private userService: UserService,
                private apiService: ApiService,
                private messageService: MessageService,
                private profileService: ProfileService,
                private toastService: ToasterService) { }

    ngOnInit() {
        this.subs.add(
            this.userService.user$.subscribe(user => {
                if ( user ) {
                    this.user = user;
                }
            })
        );

        this.subs.add(
            this.toastService.toast$.subscribe(sender => {
                if ( sender === this.sender ) {
                    this.onReset();
                }
            })
        );

        this.initializeForm();
    }

    private initializeForm() {
        if ( !this.hasProfile ) {
            this.profile = this.resetProfile();
        }

        this.userForm = this.fb.group({
            firstname: [this.profile.firstname, Validators.required],
            lastname: [this.profile.lastname, Validators.required],
            email: [this.profile.email, Validators.required],
            phone: [this.profile.phone, Validators.required],
            location: [this.profile.location, Validators.required],
            position: [this.profile.position, Validators.required],
            birthdate: [this.profile.birthdate, Validators.required]
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

        this.apiService.addProfile(profile).subscribe(response => {
            if ( response ) {
                this.messageService.sendMessage({
                    message: 'Profile successfully created',
                    error: false,
                    sender: this.sender
                });
                // tslint:disable-next-line:no-string-literal
                this.profile = response['data'] as Profile;

                response.hasProfile = true;
                this.hasProfile = this.profile.hasProfile = response.hasProfile;

                this.profileService.broadcastProfile(this.profile);
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
        // this.userForm.reset();
    }
}
