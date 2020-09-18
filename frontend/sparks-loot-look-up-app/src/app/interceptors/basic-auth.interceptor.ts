import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LogInService} from '../services/log-in.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private logInService: LogInService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with basic auth credentials if available
    const currentUser = this.logInService.getToken();
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${currentUser}`
        }
      });
    }

    return next.handle(request);
  }
}
