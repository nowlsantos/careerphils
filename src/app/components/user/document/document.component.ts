import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserService, DocumentService } from '@services/common';
import { ApiService, MessageService } from '@services/core';
import { User, DocumentModel } from '@models/index';
import { Utilities } from 'src/app/utils/utilities';

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy {
    private subscription = new Subscription();
    readonly sender = 'DOCUMENT';
    user: User;
    documents: DocumentModel[];

    // tslint:disable-next-line:object-literal-key-quotes
    uploadDisplay = { 'display': 'none' };
    selectedFile: File;

    /* tslint:disable:no-string-literal */
    constructor(private apiService: ApiService,
                private documentService: DocumentService,
                private userService: UserService,
                private messageService: MessageService) {}

    ngOnInit() {
        this.subscription.add(
            this.userService.user$.subscribe(user => {
                if ( user ) {
                    this.user = user;
                    if ( !user.documents.length || !user.profile ) {
                        return;
                    }
                }
            })
        );

        this.documentService.getDocuments().subscribe(docs => {
            this.documents = docs;
            /* if ( !this.user ) {
                return;
            } */

            this.documents.forEach(doc => {
                this.user.documents.forEach(item => {
                    const str = item.split('-')[1].split('.')[0].split('_')[0];
                    const docStr = doc.title.toLocaleLowerCase();
                    if ( docStr.includes(str) ) {
                        doc.uploaded = true;
                    }
                });
            });
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onFileSelected($event, doc: DocumentModel) {
        this.selectedFile = ($event.target as HTMLInputElement).files[0];

        const formdata = new FormData();
        formdata.append('documents', this.selectedFile);

        const filename = this.selectedFile.name.split('.')[0];

        if ( Utilities.hasSpecialCharacters(filename) ) {
            this.messageService.sendMessage({
                message: 'Special characters are found in file name. Rename the file and remove the unnecessary characters',
                error: true,
                sender: this.sender,
                duration: 6000
            });
            return;
        }

        this.subscription.add(
            this.apiService.uploadDocument(formdata, this.user.id)
            .subscribe(response => {
                if ( response instanceof HttpResponse ) {
                    const user = response.body['data'] as User;
                    user.documents.forEach(item => {
                        const str = item.split('-')[1].split('.')[0];
                        const newStr = Utilities.hasSpaceOrUnderscore(str);
                        const docStr = doc.title.toLocaleLowerCase();

                        // If match set the upload property to true
                        if ( docStr.includes(newStr) ) {
                            doc.uploaded = true;
                            return;
                        }
                    });
                }
            })
        );
    }
}
