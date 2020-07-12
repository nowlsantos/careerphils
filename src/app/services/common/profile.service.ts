import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '@models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    // tslint:disable:variable-name
    private _profileSource$ = new BehaviorSubject<Profile>(null);
    profile$ = this._profileSource$.asObservable();

    constructor() { }

    broadcastProfile(profile: Profile) {
        this._profileSource$.next(profile);
    }
}
