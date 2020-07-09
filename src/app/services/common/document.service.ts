import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentModel } from '@models/document.model';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    constructor(private http: HttpClient) { }

    getDocuments() {
        return this.http.get<DocumentModel[]>('./assets/data/documents.json');
    }
}
