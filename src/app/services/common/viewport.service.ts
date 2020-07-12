import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ViewPort } from '@models/viewport.model';

@Injectable({
    providedIn: 'root'
})
export class ViewPortService {
    // tslint:disable:variable-name
    private _viewportSource$ = new BehaviorSubject<ViewPort>(null);
    viewportLayout$ = this._viewportSource$.asObservable();

    constructor() { }

    broadcastLayout(viewport: ViewPort) {
        this._viewportSource$.next(viewport);
    }
}
