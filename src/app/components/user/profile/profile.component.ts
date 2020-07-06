import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Profile } from '@models/index';
import { ApiService, MessageService, ToasterService, UserService } from '@services/common/index';
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
                            'Chief Engineer', 'Second Engineer', 'Third Engineer', 'Fourth Engineer',
                            'Engine Cadet', 'Electrician', 'Deck Foreman', 'Pump Man', 'Quartermaster',
                            'Ordinary Seaman(OS)', 'Fitter', 'Oiler', 'Wiper', 'Chief Cook and Steward'
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
                if ( user.user_profile ) {
                    this.profile = user.user_profile;
                    this.user.hasProfile = true;
                    this.buttonTitle = 'Edit Profile';
                }
            })
        );
        
        this.subscription.add(
            this.toastService.toast$.subscribe(sender => {
                if ( sender === this.sender ) {
                    this.userService.broadcastUser(this.user);
                }
            })
        );

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
                .subscribe( _ => {
                    this.messageService.sendMessage({
                        message: 'Profile successfully created',
                        error: false,
                        sender: this.sender
                    });

                    this.router.navigate(['../dashboard'], { relativeTo: this.route });
                }
            )
        );
    }

    private editProfile(options, id) {
        this.subscription.add(
            this.apiService.updateProfile(options, id)
                .pipe(map(result => result['data'] as Profile))
                .subscribe( profile => {
                    this.profile = this.user.user_profile = profile;
                    
                    this.messageService.sendMessage({
                        message: 'Profile successfully edited',
                        error: false,
                        sender: this.sender
                    });

                    this.router.navigate(['../dashboard'], { relativeTo: this.route });
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

    onReset() {
        this.resetProfile();
        this.router.navigate(['../dashboard'], { relativeTo: this.route });
        // this.userForm.reset();
    }
}
