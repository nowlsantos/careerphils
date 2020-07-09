import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserService, DocumentService } from '@services/common';
import { ApiService, MessageService } from '@services/core';
import { User, DocumentModel } from '@models/index';

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy {
    private subscription = new Subscription();
    readonly sender = 'DOCUMENT';
    private user: User;
    documents: DocumentModel[];

    // tslint:disable-next-line:object-literal-key-quotes
    uploadDisplay = { 'display': 'none' };
    selectedFile: File;

    /* tslint:disable:no-string-literal */
    constructor(private route: ActivatedRoute,
                private router: Router,
                private apiService: ApiService,
                private documentService: DocumentService,
                private userService: UserService,
                private messageService: MessageService) {}

    ngOnInit() {
        this.subscription.add(
            this.userService.user$.subscribe(user => {
                this.user = user;
                if ( !user.documents.length ) {
                    return;
                }
            })
        );
        this.documentService.getDocuments().subscribe(docs => {
            this.documents = docs;
            this.documents.forEach(doc => {
                this.user.documents.forEach(item => {
                    const str = item.split('-')[1].split('.')[0].split('_')[0];
                    const docStr = doc.title.toLocaleLowerCase();
                    if ( docStr.includes(str) ) {
                        console.log('STR::', str, 'MATCH::', docStr.includes(str));
                        doc.uploaded = true;
                    }
                });
                console.log(doc);
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
        console.log('FILE::', filename);
        console.log('FLAG::', this.hasSpecialCharacters(this.selectedFile.name));

        if ( this.hasSpecialCharacters(filename) ) {
            this.messageService.sendMessage({
                message: 'Special characters are found in file name.\nRename the file and remove the unnecessary characters',
                error: true,
                sender: this.sender,
                duration: 6000
            });
            return;
        }

        this.subscription.add(
            this.apiService.uploadDocument(formdata, this.user.id).subscribe(response => {
                if ( response instanceof HttpResponse ) {
                    const user = response.body['data'] as User;
                    user.documents.forEach(item => {
                        // const str = item.split('-')[1].split('.')[0].split('_')[0];
                        const str = item.split('-')[1].split('.')[0];
                        const newStr = this.hasSpaceOrUnderscore(str);
                        const docStr = doc.title.toLocaleLowerCase();

                        // If match set the upload property to true
                        if ( docStr.includes(newStr) ) {
                            console.log('STR::', newStr, 'MATCH::', docStr.includes(newStr));
                            doc.uploaded = true;
                            return;
                        }
                    });
                }
            })
        );
    }

    private hasSpaceOrUnderscore(str: string) {
        if ( str.includes('_') ) {
            str = str.split('_')[0];
        } else if ( str.includes(' ') ) {
            str = str.split(' ')[0];
        }
        return str;
    }

    private hasSpecialCharacters(str: string): boolean {
        const regex = /[!$%^&*()+|~=`{}[:;<>?,@#\]0-9]/g;
        // const regex = /[-!$%^&*()_+|~=`{}[:;<>?,.@#\]0-9]/g;
        // /\W|_/g
        if ( str.match(regex) ) {
            console.log('MATCH::', str.match(regex));
            return true;
        }
        return false;
    }

    private removeSpecialCharacters(str: string) {
        if ( str.indexOf(' ') ) {
            str = String(str).split(' ').join('_');
        }
        return str.replace(/[^a-z]/gi, '').toLowerCase();
    }

    private capitalizeFirstLetter(str) {
        str = str.split(' ');
        for ( let n = 0; n < str.length; n++ ) {
            str[n] = str[n][0].toUpperCase() + str[n].substr(1);
        }
        return str.join(' ');
    }
}
