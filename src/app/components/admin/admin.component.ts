import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToasterService } from '@services/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
    // tslint:disable:variable-name
    private _subscription = new Subscription();

    constructor() {}

    ngOnInit() {
        this._subscription.add(

        );
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
