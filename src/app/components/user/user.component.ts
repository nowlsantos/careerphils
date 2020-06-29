import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService, UserService, ProfileService } from '@services/common/index';
import { SubSink } from 'subsink';
import { User, Profile } from '@models/index';
import { map } from 'rxjs/operators';

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
                private userService: UserService,
                private profileService: ProfileService) {}

    ngOnInit() {
        this.subs.add(
            this.route.data
                .pipe(
                    map(response => response['user'].data as User)
                )
                .subscribe(user => {
                this.userPhoto = `../../../assets/users/${user.photo}`;
                if ( user.user_profile ) {
                    this.profile = user.user_profile;
                    this.fullname = `${this.profile.firstname} ${this.profile.lastname}`.toUpperCase();

                    this.profileService.broadcastProfile(this.profile);
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
