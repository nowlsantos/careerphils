import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeMenuService } from '@services/common/home-menu.service';
import { HomeMenu } from '@models/homemenu.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    menu$: Observable<HomeMenu[]>;

    constructor(private router: Router,
                private homeMenuService: HomeMenuService) { }

    ngOnInit() {
        this.menu$ = this.homeMenuService.getHomeMenus();
    }

    onMenuClick(link: string) {
        this.router.navigate([`/${link}`]);
    }
}
