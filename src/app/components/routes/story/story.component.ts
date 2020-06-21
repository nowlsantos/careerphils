import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

    story2Photo = '../../../../assets/story/story2.jpg';
    story3Photo = '../../../../assets/story/story2.jpg';
    
    constructor() { }

    ngOnInit() {}
}
