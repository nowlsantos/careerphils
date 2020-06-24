import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../../../../assets/data/contents.json';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    contents: any;

    constructor(private router: Router) { }

    ngOnInit() {
        this.contents = (data as any).default;
    }

    onContentClick(link: string) {
        this.router.navigate([`/${link}`]);
    }
}
