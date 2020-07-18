import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@services/common/index';
import { ApiService } from '@services/core';
import { User, Profile } from '@models/index';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    // tslint:disable:variable-name
    private _subscription = new Subscription();
    user: User;
    selectedFile: File;
    fullname: string;
    imageUrl: any;
    profile: Profile;

    // tslint:disable-next-line:object-literal-key-quotes
    uploadDisplay = { 'display': 'none' };

    /* tslint:disable:no-string-literal */
    constructor(private route: ActivatedRoute,
                private apiService: ApiService,
                private userService: UserService) {}

    ngOnInit() {
        this.route.data
            .pipe( map(response => response['user'].data as User))
            .subscribe(user => {
                this.user = user;

                user.photo.startsWith('default') ? user.photo = `./assets/users/${user.photo}`
                                                 : user.photo = `${user.photo}`;
                if ( user.profile ) {
                    this.profile = user.profile;
                    this.fullname = `${this.profile.firstname} ${this.profile.lastname}`.toUpperCase();
                    this.userService.broadcastUser(user);
                }
            }
        );
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    onFileSelected($event) {
        this.selectedFile = ($event.target as HTMLInputElement).files[0];

        const formdata = new FormData();
        formdata.append('photo', this.selectedFile);

        // --- Populate the filelist for checking loaded files---
        // const filename = this.selectedFile.name.split('.')[0];

        this._subscription.add(
            this.apiService.uploadPhoto(formdata).subscribe(response => {
                if (response instanceof HttpResponse) {
                    const user = response.body['data'] as User;
                    this.user = user;
                    this.userService.broadcastUser(user);
                }
            })
        );
    }
}
