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
    positions: string[] = [ 'Master', 'Chief Mate', 'Second Mate', 'Third Mate',
        'Deck Cadet', 'Chief Engineer', 'Second Engineer', 'Third Engineer', 'Fourth Engineer',
        'Engine Cadet', 'Electrician', 'Deck Foreman', 'Pump Man', 'Quartermaster',
        'Ordinary Seaman(OS)', 'Fitter', 'Oiler', 'Wiper', 'Chief Cook and Steward'
    ];

    userForm: FormGroup;
    profile: Profile;
    
    readonly sender = 'PROFILE';
    private subs = new SubSink();
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
                    this.profile = this.user.profile;
                    this.user.hasProfile = true;
                }
            }),
            
            this.toastService.toast$.subscribe(sender => {
                if ( sender === this.sender ) {
                    this.userService.broadcastUser(this.user);
                    this.router.navigate(['../dashboard'], { relativeTo: this.route });
                }
            }),
        );

        this.initializeForm(this.profile);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    
    private initializeForm(profile: Profile) {
        if ( !profile ) {
            profile = this.resetProfile();
        }

        this.userForm = this.fb.group({
            firstname: [profile.firstname, Validators.required],
            lastname: [profile.lastname, Validators.required],
            email: [profile.email, Validators.required],
            phone: [profile.phone, Validators.required],
            location: [profile.location, Validators.required],
            birthdate: [profile.birthdate, Validators.required],
            position: [profile.position, Validators.required]
        });
    }

    onSubmit() {
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
            birthdate: fv.birthdate,
            position: fv.position
        };

        this.apiService.addProfile(profile, this.user.id).subscribe(response => {
            if ( response ) {
                this.messageService.sendMessage({
                    message: 'Profile successfully created',
                    error: false,
                    sender: this.sender
                });

                this.profile = this.user.profile = response['data'] as Profile; 
                this.user.hasProfile = true;
                // console.log('AddProfile::', this.profile);
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
