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
    totalUsers: number;
    pageSize = '8';

    constructor(private http: HttpClient) {}

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

    getAllUsers() {
        return this.http.get(`${this.baseUrl}/users`);
    }

    getUsers(pagenum: string) {
        return this.http.get(`${this.baseUrl}/users`, {
            params: {
                page: pagenum,
                limit: this.pageSize
            }
        });
    }

    updateUser(user: User) {
        return this.http.put(`${this.baseUrl}/users/${user.id}`, user);
    }

    deleteUser(id: string) {
        return this.http.delete(`${this.baseUrl}/users/${id}`);
    }

    /* PROFILES */
    addProfile(profileOptions, userId: string) {
        return this.http.post(`${this.baseUrl}/users/${userId}/profiles`, profileOptions);
    }

    getProfiles(searchterm: string) {
        return this.http.get<Profile[]>(`${this.baseUrl}/profiles/`, {
            params: { search: searchterm }
        });
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

    uploadDocument(formdata, id: string) {
        return this.http.patch(`${this.baseUrl}/users/${id}/updateDoc`, formdata, {
            reportProgress: true,
            observe: 'events',
        });
    }

    /* CHANGE / FORGOT / RESET PASSWORD  */
    updatePassword(passwordOptions) {
        return this.http.patch(`${this.baseUrl}/auth/updatepassword`, passwordOptions);
    }

    forgotPassword(email: string) {
        return this.http.post(`${this.baseUrl}/auth/forgotpassword`, email);
    }
}
