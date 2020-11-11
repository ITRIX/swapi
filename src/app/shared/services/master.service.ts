import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  userSearch: Subject<string>;
  constructor() {
    this.userSearch = new Subject();
  }
}
