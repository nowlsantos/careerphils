import { Injectable } from '@angular/core';
import { ApiService } from '.';
import { MessageService } from '../core';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private fileList: string[] = [];
    readonly sender = 'FILE_SERVICE';

    constructor(private apiService: ApiService,
                private messageService: MessageService) { }


    upload(formdata: FormData): Observable<HttpEvent<any>> {
        return this.apiService.uploadPhoto(formdata);
    }

    addFilename(filename: string): boolean {
        if ( !this.fileList.includes(filename) ) {
            this.fileList.push(filename);
            return true;
        }

        this.messageService.sendMessage({
            message: `You've already uploaded a photo by the name of ${filename}`,
            error: false,
            sender: this.sender
        });
        return false;
    }

    removeFilename(filename: string) {
        if ( this.fileList.includes(filename) ) {
            this.fileList = this.fileList.filter(item => item === filename);
        }
    }

    getFileList() {
        return this.fileList;
    }
 }
