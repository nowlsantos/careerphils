import { Component, OnInit, Input } from '@angular/core';
import { User } from '@models/user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @Input() user: User;
    fullname: string;

    constructor() { }

    ngOnInit() {
        this.user.photo.startsWith('default') ? this.user.photo = `./assets/users/${this.user.photo}`
                                              : this.user.photo = `${this.user.photo}`;

        if ( this.user.user_profile ) {
            this.fullname = `${this.user.user_profile.firstname} ${this.user.user_profile.lastname}`.toUpperCase();
        } else {
            this.fullname = '__BLANK__';
        }
    }

}
