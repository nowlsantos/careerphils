import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, Profile, DocumentModel } from '@models/index';
import * as data from '../../../../assets/data/documents.json';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    profile: Profile;
    documents: DocumentModel[];

    constructor(@Inject(MAT_DIALOG_DATA) public user: User) {}

    ngOnInit() {
        this.profile = this.user.profile;
        this.documents = (data as any).default as DocumentModel[];
        this.matchDocumentsUpload();
    }

    matchDocumentsUpload() {
        this.documents.forEach(doc => {
            const title = doc.title.toLocaleLowerCase().split(' ')[0];
            doc.uploaded = false;

            for ( const item of this.user.documents ) {
                let str = item.split('-')[1].split('.')[0].toLocaleLowerCase();
                if ( str.includes('_') ) {
                    str = str.split('_')[0];
                } else if ( str.includes(' ') ) {
                    str = str.split(' ')[0];
                }

                if ( title.includes(str) ) {
                    doc.uploaded = true;
                    break;
                }
            }
        });
    }
}
