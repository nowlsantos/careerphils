import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    readonly MAXAGE = 30000;
    cache = new Map<string, any>();

    get(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        const cached = this.cache.get(url);

        if ( !cached ) {
            return undefined;
        }

        const isExpired = cached.lastRead < (Date.now() - this.MAXAGE);
        const expired = isExpired ? 'expired ' : '';

        return cached.response;
    }

    put(req: HttpRequest<any>, res: HttpResponse<any>) {
        const url = req.url;
        const entry = { url, res, lastRead: Date.now() };
        this.cache.set(url, entry);

        const expired = Date.now() - this.MAXAGE;
        this.cache.forEach(expiredEntry => {
            if ( expiredEntry.lastRead < expired ) {
                this.cache.delete(expiredEntry.url);
            }
        });
    }
}
