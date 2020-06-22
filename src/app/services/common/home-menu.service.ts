import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeMenu } from '@models/homemenu.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomeMenuService {
    constructor(private http: HttpClient) {}

    getHomeMenus(): Observable<HomeMenu[]> {
        return this.http.get<HomeMenu[]>('../../../../assets/data/home-menu.json');
    }
}
