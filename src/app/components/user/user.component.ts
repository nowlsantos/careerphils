import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/common/index';
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
                private apiService: ApiService) {}

    ngOnInit() {
        let user: User;
        this.subs.add(
            this.route.data.subscribe(result => {
                user = result['user'].data as User;
                this.userPhoto = `../../../assets/users/${user.photo}`;
            })
        );

        if ( !this.profile ) {
            this.apiService.getUsers().pipe(
                map(result => result['data'].filter(item => item.id === user.id))
            ).subscribe(data => {
                if ( data[0].user_profile ) {
                    this.profile = data[0].user_profile as Profile;
                    this.fullname = `${this.profile.firstname} ${this.profile.lastname}`.toUpperCase();
                }
            });
        }
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
