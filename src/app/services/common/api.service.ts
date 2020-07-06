import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '@models/user.model';
import { Profile } from '@models/profile.model';
import { UserModule } from '@components/user/user.module';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    /* USERS */
    register(userOptions) {
        return this.http.post(`${this.baseUrl}/auth/register`, userOptions);
    }

    login(user: User) {
        return this.http.post(`${this.baseUrl}/auth/login`, user);
    }

    logout() {
        return this.http.get(`${this.baseUrl}/auth/logout`);
    }

    getMe() {
        return this.http.get(`${this.baseUrl}/auth/me`);
    }

    getUser(id: string) {
        return this.http.get(`${this.baseUrl}/users/${id}`);
    }

    getUsers() {
        return this.http.get(`${this.baseUrl}/users`);
    }

    update(user: User) {
        return this.http.put(`${this.baseUrl}/users/${user.id}`, user);
    }

    delete(id: string) {
        return this.http.delete(`${this.baseUrl}/users/${id}`);
    }

    /* PROFILES */
    addProfile(profileOptions, userId: string) {
        return this.http.post(`${this.baseUrl}/users/${userId}/profiles`, profileOptions);
    }

    getAllProfiles() {
        return this.http.get<Profile[]>(`${this.baseUrl}/profiles/`);
    }

    getProfile(profileId: string) {
        return this.http.get(`${this.baseUrl}/profiles/${profileId}`);
    }

    updateProfile(profile, profileId) {
        return this.http.patch(`${this.baseUrl}/profiles/${profileId}`, profile);
    }

    deleteProfile(profileId: string) {
        return this.http.delete(`${this.baseUrl}/profiles/${profileId}`);
    }

    /* UPLOADS */
    uploadPhoto(formdata) {
        return this.http.patch(`${this.baseUrl}/users/updateMe`, formdata, {
            reportProgress: true,
            observe: 'events',
            // responseType: 'arraybuffer' | 'blob' | 'json' | 'text',
        });
    }

    /* getUserPhoto(id: string) {
        return this.http.get(`${this.baseUrl}/users/${id}/photo`);
    }

    getImage(url: string) {
        return this.http.get(url, { responseType: 'blob' as 'json'});
    } */

    /* CHANGE / FORGOT / RESET PASSWORD  */
    updatePassword(passwordOptions) {
        return this.http.patch(`${this.baseUrl}/auth/updatepassword`, passwordOptions);
    }

    forgotPassword(email: string) {
        return this.http.post(`${this.baseUrl}/auth/forgotpassword`, email);
    }
}
