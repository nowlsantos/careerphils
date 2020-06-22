import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '@services/common/api.service';

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
    documents = [
                 'Transcript of Records',
                 'Medical Certificate',
                 'Employment Certificate',
                 'Passport / Seamans Book'
                ];

    // tslint:disable-next-line:object-literal-key-quotes
    uploadDisplay = { 'display': 'none' };
    selectedFile: File;

    constructor(private apiService: ApiService) { }

    ngOnInit() {}

    onFileSelected($event) {
        this.selectedFile = ($event.target as HTMLInputElement).files[0];

        const fd = new FormData();
        fd.append('fileItem', this.selectedFile);

        this.apiService.uploadPhoto(fd).subscribe(response => {
            if ( response instanceof HttpResponse ) {
                // tslint:disable-next-line:no-string-literal
                // const user = response.body['data'];
                // this.userPhoto = `/assets/users/${user.photo}`;
                // this.userService.broadcastUser(user);
            }
        });
    }
}
