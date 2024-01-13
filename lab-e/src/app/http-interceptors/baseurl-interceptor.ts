import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

/** Set base URL for todos API */
@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const targetURL = 'http://localhost:37611/todos/' + req.url;
      const newReq = req.clone({url: targetURL});
    return next.handle(newReq);
  }
}
