import { Component, OnInit } from '@angular/core';
import { HomeMenuService } from '@services/home-menu.service';
import { Observable } from 'rxjs';
import { HomeMenu } from '@models/homemenu.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    menu$: Observable<HomeMenu[]>;

    constructor(private homeMenuService: HomeMenuService) { }

    ngOnInit() {
        this.menu$ = this.homeMenuService.getHomeMenus();
    }

    onMenuClick(link: string) {
        console.log('Link:', link);
    }

}
