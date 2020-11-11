import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import { LoaderService } from './loader.service';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request)
      .pipe(catchError((err) => {
        this.loaderService.hide();
        return err;
      }))
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
            this.loaderService.hide();
        }
        return evt;
      }));
  }
}
