import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as _ from 'lodash';

const MENU_DATA_KEY = 'bookwale_menu_data';

@Injectable({
  providedIn: 'root'
})
export class DynamicDataService {
  
//  checkAllPromise = new BehaviorSubject(false);
  networkConnection = new BehaviorSubject(true);
  offlineImages = new BehaviorSubject(true);

  constructor() {}

  updateNewtworkStatus(status){
    this.networkConnection.next(status);
 }

//  checkPromiseDone(status){
//   this.checkAllPromise.next(status);
// }

 modeOfLoadingImages(type){
   this.offlineImages.next(type)
 }
}
