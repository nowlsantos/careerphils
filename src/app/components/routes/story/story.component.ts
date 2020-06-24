import { Component, OnInit } from '@angular/core';
import * as data from '../../../../assets/data/story.json';

@Component({
    selector: 'app-story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

    story2Photo = '../../../../assets/story/story2.jpg';
    story3Photo = '../../../../assets/story/story2.jpg';

    text1: string;
    text2: string;
    text3: string;
    constructor() { }

    /* tslint:disable:no-string-literal */
    ngOnInit() {
        this.text1 = ( data as any ).default['text1'];
        this.text2 = ( data as any ).default['text2'];
        this.text3 = ( data as any ).default['text3'];
    }
}
