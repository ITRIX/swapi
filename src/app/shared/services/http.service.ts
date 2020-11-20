import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HTTPOptions } from '../../models/http/options';
import { LoaderService } from './loader.service';

interface UrlState {
  url: string;
  isFinished?: boolean;
}

@Injectable({ providedIn: 'root' })
export class HttpService {
  private urlState: UrlState[] = [];

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
  ) { }

  get<T>(url: string, options?: HTTPOptions) {
    this.initRequest(url, options);
    return this.http.get<T>(url, options)
      .pipe(finalize(() => this.finalizeRequest(url)));
  }

  put<T>(url: string, body: any | null, options?: HTTPOptions) {
    this.initRequest(url, options);
    return this.http.put<T>(url, body, options)
      .pipe(finalize(() => this.finalizeRequest(url)));
  }

  post<T>(url: string, body: any | null, options?: HTTPOptions) {
    this.initRequest(url, options);
    return this.http.post<T>(url, body, options)
      .pipe(finalize(() => this.finalizeRequest(url)));
  }

  private initRequest(url: string, options: HTTPOptions) {
    this.urlState.push( { url, isFinished: false } );
    this.loaderService.show();
  }

  private finalizeRequest(url: string) {
    const found = this.urlState.find(x => x.url === url && !x.isFinished);
    if (found) {
      found.isFinished = true;
    }
    if (this.urlState.every(x => x.isFinished)) {
      this.loaderService.hide();
      this.urlState = [];
    }
  }
}
