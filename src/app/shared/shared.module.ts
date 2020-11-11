import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoaderComponent } from './components/loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './services/http-request-interceptor';

const sharedModules = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  InfiniteScrollModule
];

const sharedComponents = [
  HeaderComponent,
  FooterComponent,
  LoaderComponent
];


@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent],
  imports: [...sharedModules],
  exports: [...sharedModules, ...sharedComponents],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
  ]
})
export class SharedModule { }
