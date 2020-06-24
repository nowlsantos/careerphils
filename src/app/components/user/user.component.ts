import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/common/api.service';
import { SubSink } from 'subsink';
import { User } from '@models/user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    private subs = new SubSink();
    // hasProfile = false;
    // hasPhoto = false;
    selectedFile: File;
    userPhoto: string;
    fullname: string;
    user: User;

    // tslint:disable-next-line:object-literal-key-quotes
    uploadDisplay = { 'display': 'none' };

    /* tslint:disable:no-string-literal */
    constructor(private route: ActivatedRoute,
                private apiService: ApiService) {}

    ngOnInit() {
        // console.log('ID Snapshot::', this.route.snapshot.paramMap.get('id'));

        this.subs.add(
            this.route.data.subscribe(result => {
                this.user = result['user'].data as User;
                this.userPhoto = `../../../assets/users/${this.user.photo}`;
                // console.log('User hasProfile::', this.user.hasProfile);
                // console.log('User ProfileID::', this.user.profileId);
            })
        );

        /* this.subs.add(
            this.profileService.profile$.subscribe(profile => {
                if ( profile ) {
                    this.hasProfile = profile.hasProfile;
                    this.fullname = `${profile.firstname} ${profile.lastname}`.toUpperCase();
                }
            })
        ); */
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
