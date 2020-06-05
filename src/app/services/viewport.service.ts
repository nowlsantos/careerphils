import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ViewPort } from '../services/models/viewport.model';

@Injectable({
    providedIn: 'root'
})
export class ViewPortService {

    private viewportSource$ = new BehaviorSubject<ViewPort>(null);
    viewportLayout$ = this.viewportSource$.asObservable();

    constructor() { }

    broadcastLayout(viewport: ViewPort) {
        this.viewportSource$.next(viewport);
    }
}