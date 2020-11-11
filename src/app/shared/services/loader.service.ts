import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  loaderState = new BehaviorSubject<boolean>(false);

  constructor() { }

  show() {
    this.loaderState.next(true);
  }

  hide() {
    this.loaderState.next(false);
  }

}

