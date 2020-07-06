import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CacheService } from '@services/common/cache.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // Continue next handler if not cachable
        if ( request.method !== 'GET' ) {
            return next.handle(request);
        }

        const cacheService = this.injector.get(CacheService);
        const cacheResponse = cacheService.get(request);
        return cacheResponse ? of(cacheResponse) : this.sendRequest(request, next, cacheService);
    }

    private sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: CacheService): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            tap(event => {
                if ( event instanceof HttpResponse ) {
                    cache.put(req, event);
                }
            })
        );
    }
}
