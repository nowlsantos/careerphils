import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService, UserService } from '@services/common/index';
import { SubSink } from 'subsink';
import { User, Profile } from '@models/index';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    private subs = new SubSink();
    selectedFile: File;
    userPhoto: string;
    fullname: string;
    profile: Profile;

    // tslint:disable-next-line:object-literal-key-quotes
    uploadDisplay = { 'display': 'none' };

    /* tslint:disable:no-string-literal */
    constructor(private route: ActivatedRoute,
                private apiService: ApiService,
                private userService: UserService) {}

    ngOnInit() {
        this.subs.add(
            /* this.userService.user$.subscribe(user => {
                if ( user ) {
                    if ( user.profile ) {
                        this.fullname = `${user.profile.firstname} ${user.profile.lastname}`.toUpperCase();
                    }
                }
            }), */

            this.route.data.subscribe(result => {
                const user = result['user'].data as User;
                this.userPhoto = `../../../assets/users/${user.photo}`;

                user.profile = result['user'].data.user_profile;
                if ( user.profile ) {
                    this.profile = user.profile;
                    this.fullname = `${this.profile.firstname} ${this.profile.lastname}`.toUpperCase();
                    this.userService.broadcastUser(user);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    onFileSelected($event) {
        this.selectedFile = ($event.target as HTMLInputElement).files[0];

        const fd = new FormData();
        fd.append('fileItem', this.selectedFile);

        this.apiService.uploadPhoto(fd).subscribe(response => {
            if ( response instanceof HttpResponse ) {
                const user = response.body['data'] as User;
                this.userPhoto = `/assets/users/${user.photo}`;
                user.hasPhoto = true;
            }
        });
    }
}
