import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '@models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private profileSource$ = new BehaviorSubject<Profile>(null);
    profile$ = this.profileSource$.asObservable();

    private profile: Profile;

    constructor() { }

    broadcastProfile(profile: Profile) {
        this.profile = profile;
        this.profileSource$.next(profile);
    }

    getProfile() {
        return this.profile;
    }

    getId() {
        return this.profile.id;
    }
}
