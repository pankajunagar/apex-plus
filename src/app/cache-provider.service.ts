import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CacheService } from "ionic-cache";


@Injectable({
  providedIn: 'root'
})
export class CacheProviderService {

  constructor(
    private http: Http, private cache: CacheService
  ) { }

  loadList(url) {
    let cacheKey = url;
    let request = this.http.post(url,{});
    // alert(request)
    return this.cache.loadFromObservable(cacheKey, request); //.pipe(map(res => res.body))
 } 
}
