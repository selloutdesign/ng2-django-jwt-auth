import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class JobsService {

  constructor(
    private authHttp: AuthHttp,
  ) {}

  getJobs(): Observable<any> {
    return this.authHttp
      .get('https://work-4-la-poundimal.c9users.io/auth/jobs/')
      .map(res => res.json());
  }

}
