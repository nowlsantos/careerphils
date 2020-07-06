import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '@services/common/api.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy {
    private subscription = new Subscription();
    documents = [ 'Transcript of Records',
                  'NSO/Birth Certificate',
                  'Medical Certificate',
                  'Employment Certificate',
                  'Passport / Seamans Book',
                  'NBI/Police Clearance'
                ];

    // tslint:disable-next-line:object-literal-key-quotes
    uploadDisplay = { 'display': 'none' };
    selectedFile: File;

    constructor(private apiService: ApiService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onFileSelected($event) {
        this.selectedFile = ($event.target as HTMLInputElement).files[0];

        const fd = new FormData();
        fd.append('fileItem', this.selectedFile);

        this.subscription.add(
            this.apiService.uploadPhoto(fd).subscribe(response => {
                if ( response instanceof HttpResponse ) {
                    // tslint:disable-next-line:no-string-literal
                    // const user = response.body['data'];
                    // this.userPhoto = `/assets/users/${user.photo}`;
                    // this.userService.broadcastUser(user);
                }
            })
        );
    }

    testNavigation() {
        this.router.navigate(['../dashboard'], { relativeTo: this.route });
    }
}
