import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
    peoplePhoto = '../../../../assets/people/people1.jpg';

    constructor() { }

    ngOnInit(): void {
    }

}
