import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Profile } from '@models/index';
import { ApiService, MessageService, ToasterService } from '@services/core';
import { UserService } from '@services/common/user.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
    // tslint:disable:no-trailing-whitespace
    /* tslint:disable:no-string-literal */
    positions: string[] = [ 'Master', 'Chief Mate', 'Second Mate', 'Third Mate', 'Deck Cadet',
                            'Chief Engineer', 'Second Engineer', 'Third Engineer', 'Engine Cadet', 
                            'Electrician', 'Deck Foreman', 'Pump Man', 'Quartermaster', 'Fitter', 'Oiler'
    ];

    userForm: FormGroup;
    profile: Profile;
    buttonTitle = 'Save Profile';
    
    private subscription = new Subscription();
    readonly sender = 'PROFILE';
    private user: User;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private apiService: ApiService,
                private userService: UserService,
                private messageService: MessageService,
                private toastService: ToasterService) {
                    this.userForm = this.fb.group({
                        firstname: ['', Validators.required],
                        lastname: ['', Validators.required],
                        email: ['', Validators.required],
                        phone: ['', Validators.required],
                        location: ['', Validators.required],
                        birthdate: ['', Validators.required],
                        position: ['', Validators.required]
                    });
                }

    ngOnInit() {
        this.subscription.add(
            this.userService.user$.subscribe(user => {
                this.user = user;
                if ( user.profile ) {
                    this.profile = user.profile;
                    this.user.hasProfile = true;
                    this.buttonTitle = 'Edit Profile';
                }
            })
        );
        
        /* this.subscription.add(
            this.toastService.toast$.subscribe(sender => {
                if ( sender === this.sender ) {
                    this.userService.broadcastUser(this.user);
                }
            })
        ); */

        this.initializeForm(this.profile);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    private initializeForm(profile: Profile) {
        if ( !profile ) {
            profile = this.resetProfile();
        }

        this.userForm.patchValue({
            firstname: profile.firstname,
            lastname: profile.lastname,
            email: profile.email,
            phone: profile.phone,
            location: profile.location,
            birthdate: profile.birthdate,
            position: profile.position
        });
    }

    onSubmit() {
        if ( this.userForm.invalid ) {
            return;
        }

        const fv = this.userForm.value;
        const profileOptions = {
            // profileId: this.profile._id,
            userId: this.user.id,
            firstname: fv.firstname,
            lastname: fv.lastname,
            email: fv.email,
            phone: fv.phone,
            location: fv.location,
            birthdate: fv.birthdate,
            position: fv.position
        };

        !this.profile ? this.saveProfile(profileOptions) : this.editProfile(profileOptions, this.profile._id);
    }

    private saveProfile(option) {
        this.subscription.add(
            this.apiService.addProfile(option, this.user.id)
                .pipe(map(response => response['data'] as Profile))
                .subscribe( profile => {
                    this.user.profile = profile;
                    this.user.hasProfile = true;

                    this.messageService.sendMessage({
                        message: 'Profile successfully created',
                        error: false,
                        sender: this.sender
                    });

                    this.router.navigate(['../dashboard'], { relativeTo: this.route });
                    this.markFormPristine(this.userForm);
                }
            )
        );
    }

    private editProfile(options, id) {
        this.subscription.add(
            this.apiService.updateProfile(options, id)
                .pipe(map(result => result['data'] as Profile))
                .subscribe( profile => {
                    this.profile = this.user.profile = profile;
                    
                    this.messageService.sendMessage({
                        message: 'Profile successfully edited',
                        error: false,
                        sender: this.sender
                    });
                    
                    this.router.navigate(['../dashboard'], { relativeTo: this.route });
                    this.markFormPristine(this.userForm);
                })
        );
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

    isDirty() {
        return this.userForm.dirty;
    }

    onReset() {
        this.userForm.reset();
    }

    private markFormPristine(form: FormGroup) {
        Object.keys(form.controls).forEach(control => {
            form.controls[control].markAsPristine();
        });
    }
}
