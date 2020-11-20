import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HTTPOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    responseType?: 'json';
}
