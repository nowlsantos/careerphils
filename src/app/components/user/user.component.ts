import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '@services/api.service';
import { HttpResponse } from '@angular/common/http';
import { UserService } from '@services/user.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    subs = new SubSink();
    hasProfile = false;
    selectedFile: File;
    userPhoto: string;

    // tslint:disable-next-line:object-literal-key-quotes
    uploadDisplay = { 'display': 'none'};

    constructor(private apiService: ApiService,
                private userService: UserService) {}

    ngOnInit() {
        this.subs.add( this.userService.user$.subscribe(user => {
            if ( user ) {
                this.userPhoto = `../../../assets/users/${user.photo}`;
            }
        }));
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
                // tslint:disable-next-line:no-string-literal
                const user = response.body['data'];
                this.userPhoto = `/assets/users/${user.photo}`;
                this.userService.broadcastUser(user);
            }
        });
    }
}
