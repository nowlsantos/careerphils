import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '@models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private profileSource$ = new BehaviorSubject<Profile>(null);
    profile$ = this.profileSource$.asObservable();

    constructor() { }

    broadcastProfile(profile: Profile) {
        this.profileSource$.next(profile);
    }
}
