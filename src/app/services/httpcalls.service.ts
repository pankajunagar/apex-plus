import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { SERVER_URL } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { LoaderService } from './loader.service';

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpcallsService {

  http = null;
  hdr = null;
  view = null;
  app_id = null;
  defaultLoader = true;

  constructor(
    private http_client : HttpClient,
    private http_native: HTTP,
    private platform : Platform,
    private router : Router,
    private loader: LoaderService,
  ) { 
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.http = this.http_native;
      this.hdr = { 'Content-Type': 'application/json' }
      this.view = 'mobile';
    } else {
      this.http = this.http_client;
      this.hdr = headers
      this.view = 'HTML';
    }
    this.http = this.http_client;
    this.hdr = headers
    this.view = 'HTML';  
  }

  getAppId(){
    return this.app_id
  }
  
  registerAppId(app_id){
    this.app_id = app_id;
  }

  handleError(error) {
    this.loader.stopLoading();    
  }

  extractData(res) {
    this.loader.stopLoading();
    if(this.view == 'mobile'){
      res = JSON.parse(res['data']);
    }   
    if(res['required_login'] === "-1"){      
      this.router.navigate(['login', {reset_user_details: true}]);
      return null;
    }
      const body = res;
      return body || {};
  }

  toParams(obj) {
    const p = [];
    for (const key in obj) {
      p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
  }

  postRequest(url, params, isLoader=this.defaultLoader) {
    if(isLoader){
      this.loader.start();
    }
    params['app_id'] = this.app_id;        
    if (this.view == 'HTML') {
      params = this.toParams(params);     
      return this.http.post(SERVER_URL + url, params, this.hdr).pipe(map(this.extractData.bind(this)), catchError(this.handleError.bind(this)));
    } else {    
      return from(this.http.post(SERVER_URL + url, params, this.hdr)).pipe(map(this.extractData.bind(this)), catchError(this.handleError.bind(this)));
    }  
  }

  authenticate(params) {
    params['app_id'] = '123456';
    //this.loader.start();     
    if (this.view == 'HTML') {
      params = this.toParams(params);
    }
    return this.http.post(
      SERVER_URL + 'login/login.php',
      params, headers
    ).subscribe((response) => {
      console.log(response);
    });
  }
}
