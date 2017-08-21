import { Component } from '@angular/core';

import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  thing: any;
  title = 'app works!';
  body = 'username=jsells&password=H0n0rFa1th1985&client_id=VisKOOvUVtPHCkLryKieu9Nse86EpkuqUNRMrbpm&grant_type=password';
  // private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(
    private authHttp: AuthHttp,
    private http: Http,
  ) { }
  
  start(): void{
    this.title = 'Changed';
    console.log('Changed');
  }

  getGroups() {
    let b = 'username=jsells&password=H0n0rFa1th1985&client_id=VisKOOvUVtPHCkLryKieu9Nse86EpkuqUNRMrbpm&grant_type=password';
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, method: 'get' });
    
    this.http.get('http://127.0.0.1:8000/groups/', options)
      .subscribe(
        data => {
          let res = data.json();
          console.log(res);
          this.thing = data; console.log(data);
        },
        err => console.log(err),
        () => console.log('Request Complete')
      );
  }

  
  login(credentials) {
    let b = 'username=jsells&password=H0n0rFa1th1985';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('x-requested-with','XMLHttpRequest');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    this.http.post('http://127.0.0.1:8000/api-token-auth/', b, options)
      .map(res => {
        console.log(res.json());
        this.thing = res.json();
        localStorage.setItem('token', this.thing.token);
      })
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => console.log(data),
        error => console.log(error)
      );
  }
}
