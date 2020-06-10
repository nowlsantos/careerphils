import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // Get the token from the service
        const authService = this.injector.get(AuthService);

        // Clone the request and replace the original headers with cloned headers, updated with the authorization.
        const authToken = request.clone({
            setHeaders: {
                Authorization: `Bearer ${authService.getToken()}`
            }
        });

        // send cloned request with header to the next handler.
        return next.handle(authToken);
    }
}
