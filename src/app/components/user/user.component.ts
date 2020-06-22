import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService, ProfileService } from '@services/common/index';
import { SubSink } from 'subsink';
import { User } from '@models/user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    private subs = new SubSink();
    hasProfile = false;
    hasPhoto = false;
    selectedFile: File;
    userPhoto: string;
    fullname: string;

    // tslint:disable-next-line:object-literal-key-quotes
    uploadDisplay = { 'display': 'none' };

    constructor(private route: ActivatedRoute,
                private apiService: ApiService,
                private profileService: ProfileService) {}

    ngOnInit() {
        this.subs.add(
            this.route.data.subscribe(result => {
                // tslint:disable-next-line:no-string-literal
                const user = result['user'].data as User;
                this.userPhoto = `../../../assets/users/${user.photo}`;
            })
        );

        this.subs.add(
            this.profileService.profile$.subscribe(profile => {
                if ( profile ) {
                    this.hasProfile = profile.hasProfile;
                    this.fullname = `${profile.firstname} ${profile.lastname}`.toUpperCase();
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
                this.hasPhoto = true;

                // tslint:disable-next-line:no-string-literal
                const user = response.body['data'];
                this.userPhoto = `/assets/users/${user.photo}`;
            }
        });
    }
}
