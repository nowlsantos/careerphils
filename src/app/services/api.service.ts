import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './models/user.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    register(user: User) {
        return this.http.post(`${this.baseUrl}/register`, user);
    }

    login(user: User) {
        return this.http.post(`${this.baseUrl}/authentication`, user);
    }

    getUser(id: string) {
        return this.http.get(`${this.baseUrl}/users/${id}`);
    }

    getUsers() {
        return this.http.get<User[]>(`${this.baseUrl}/users`);
    }

    update(id: string, user: User) {
        return this.http.put(`${this.baseUrl}/users/${id}`, user);
    }

    delete(id: string) {
        return this.http.delete<User>(`${this.baseUrl}/users/${id}`);
    }
}
