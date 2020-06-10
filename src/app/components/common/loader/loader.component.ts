import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@services/loader.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

    color = 'accent';
    mode = 'indeterminate';
    value = 40;
    isLoading$: BehaviorSubject<boolean>;

    constructor(private loaderService: LoaderService) {}

    ngOnInit() {
        this.isLoading$ = this.loaderService.isLoading;
    }
}
