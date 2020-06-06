import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(catchError(error => this.handleError(error)));
    }

    private handleError(err: Error | HttpErrorResponse) {
        let message = '';

        // client side error
        if (err instanceof ErrorEvent) {
            message = `${err.error.message}`;
        // Server side error
        } else if (err instanceof HttpErrorResponse) {
            message = `${err.error.message}`;
        }
        const errorService = this.injector.get(ErrorService);
        errorService.setMessage(message);

        // throw the error to the component to handle the display
        return throwError(err);
    }
}
