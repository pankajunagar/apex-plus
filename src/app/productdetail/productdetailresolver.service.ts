import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpcallsService } from '../services/httpcalls.service';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailresolverService implements Resolve<any>{

  constructor(
    private http : HttpcallsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
     return this.http.postRequest('product/details.php',{ product_id : route.params['product_id'],
     finish: route.params['finish'] , size : route.params['size']})
  }
  
}
