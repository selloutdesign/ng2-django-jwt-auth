import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { JobService } from './app.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { JsonpModule } from '@angular/http';


import { MyAuthModule } from './my-auth/my-auth.module';
import { AppComponent } from './app.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MyAuthModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    JobService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
