import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-mission',
    templateUrl: './mission.component.html',
    styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
    missionPhoto = '../../../../assets/mission/mission1.jpg';

    constructor() { }

    ngOnInit(): void {
    }

}
