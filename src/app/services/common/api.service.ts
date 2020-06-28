import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '@models/user.model';
import { Profile } from '@models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    /* USERS */
    register(user: User) {
        return this.http.post<User>(`${this.baseUrl}/auth/register`, user);
    }

    login(user: User) {
        return this.http.post<User>(`${this.baseUrl}/auth/login`, user);
    }

    logout() {
        return this.http.get<User>(`${this.baseUrl}/auth/logout`);
    }

    getMe() {
        return this.http.get<User>(`${this.baseUrl}/auth/me`);
    }

    getUser(id: string) {
        return this.http.get<User>(`${this.baseUrl}/users/${id}`);
    }

    getUsers() {
        return this.http.get<User[]>(`${this.baseUrl}/users`);
    }

    update(user: User) {
        return this.http.put<User>(`${this.baseUrl}/users/${user.id}`, user);
    }

    delete(id: string) {
        return this.http.delete<User>(`${this.baseUrl}/users/${id}`);
    }

    /* PROFILES */
    addProfile(profile: Profile, userId: string) {
        return this.http.post<Profile>(`${this.baseUrl}/users/${userId}/profiles`, profile);
    }

    getAllProfiles() {
        return this.http.get<Profile[]>(`${this.baseUrl}/profiles/`);
    }

    getProfile(profileId: string) {
        return this.http.get<Profile>(`${this.baseUrl}/profiles/${profileId}`);
    }

    updateProfile(profile: Profile) {
        return this.http.put<Profile>(`${this.baseUrl}/profiles/${profile.id}`, profile);
    }

    deleteProfile(profileId: string) {
        return this.http.delete<Profile>(`${this.baseUrl}/profiles/${profileId}`);
    }

    /* UPLOADS */
    uploadPhoto(formdata) {
        return this.http.patch(`${this.baseUrl}/users/updateMe`, formdata, {
            reportProgress: true,
            observe: 'events'
        });
    }

    /* CHANGE / FORGOT / RESET PASSWORD  */
    updatePassword(user: User) {
        return this.http.patch<User>(`${this.baseUrl}/auth/updatepassword`, user);
    }

    forgotPassword(email: string) {
        return this.http.post(`${this.baseUrl}/auth/forgotpassword`, email);
    }
}
