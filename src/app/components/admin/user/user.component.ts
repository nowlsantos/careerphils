import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { User, Profile } from '@models/index';
import { DialogService, UserService, ApiService } from '@services/common/';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnChanges {
    // tslint:disable:variable-name
    @Input() user: User;
    @Input() profile: Profile;
    fullname: string;
    position: string;
    userPhoto: string;

    /* tslint:disable:no-string-literal */
    constructor(private dialogService: DialogService,
                private userService: UserService,
                private apiService: ApiService) { }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if ( changes['user'] ) {
            this.user = changes['user'].currentValue as User;
            this.processUser();
        }
        else if ( changes['profile'] ) {
            this.profile = changes['profile'].currentValue as Profile;
            this.processProfile();
        }
    }

    private processUser() {
        if ( !this.user.profile ) {
            this.fullname = '__NO PROFILE__';
            this.position = '---';
        } else {
            this.fullname = `${this.user.profile.firstname} ${this.user.profile.lastname}`.toUpperCase();
            this.position = this.user.profile.position;
        }

        this.getUserPhoto(this.user);
    }

    private processProfile() {
        const users = this.userService.getAllUsers();
        for ( const user of users ) {
            if ( this.profile.user === user.id ) {
                this.user = user;
                this.fullname = `${this.profile.firstname} ${this.profile.lastname}`.toUpperCase();
                this.position = this.profile.position;
                this.getUserPhoto(user);
            }
        }
    }

    getUserPhoto(user: User) {
        user.photo.startsWith('default') ? user.photo = `./assets/users/${user.photo}`
                                         : user.photo = `${user.photo}`;

        return this.userPhoto = user.photo;
    }

    viewDetails(user: User) {
        this.dialogService.openUserDialog(user);
    }

    deleteUser(user: User) {
        this.dialogService.openDeleteDialog().subscribe((result: boolean) => {
            if ( result === true ) {
                // console.log('Confirm delete');
                this.apiService.deleteUser(user.id);
            }
        });
    }
}
