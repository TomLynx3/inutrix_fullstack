import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';

import { catchError, map, Observable } from 'rxjs';
import { Root } from '../utilities/tools';
import { AuthService } from '../services/auth/auth.service';
import { LoadingService } from '../services/loading/loading.service';
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private readonly _authService: AuthService,
    private readonly _loadingService: LoadingService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._loadingService.setLoading(true, request.url);
    const req = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._authService.getToken()}`,
      },
      body: JSON.stringify(request.body),
      url: Root(request.url),
    });
    return next
      .handle(req)
      .pipe(
        catchError((err) => {
          setTimeout(() => {
            this._loadingService.setLoading(false, request.url);
          }, 150);

          return err;
        })
      )
      .pipe(
        map((event: any) => {
          if (event instanceof HttpResponse) {
            setTimeout(() => {
              this._loadingService.setLoading(false, request.url);
            }, 150);
          }
          return event;
        })
      );
  }
}
