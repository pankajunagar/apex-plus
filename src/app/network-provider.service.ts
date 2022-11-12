import { Injectable } from '@angular/core';
import { AlertController, Events } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { DynamicDataService } from './services/dynamic-data.service';

export enum ConnectionStatusEnum {
    Online,
    Offline
}


@Injectable()
export class NetworkProvider {

  previousStatus;

  constructor(public alertCtrl: AlertController, 
              public network: Network,
              public eventCtrl: Events,
              private dynamicData: DynamicDataService) {
    this.previousStatus = ConnectionStatusEnum.Online;
    this. initializeNetworkEvents();
  }

    public initializeNetworkEvents(): void {
        // alert("1");
        this.network.onDisconnect().subscribe(() => {
            // alert("2");
            if (this.previousStatus === ConnectionStatusEnum.Online) {
                // alert("3");
                this.eventCtrl.publish('network:offline');
                this.dynamicData.updateNewtworkStatus(false);  
            //    alert( "On disconnect - " +this.dynamicData.networkConnection.value)
            }
            this.previousStatus = ConnectionStatusEnum.Offline;
        }, error => alert('p'+error));
        this.network.onConnect().subscribe(() => {
            // alert("4");
            if (this.previousStatus === ConnectionStatusEnum.Offline) {
                // alert("5");
                this.eventCtrl.publish('network:online');
                this.dynamicData.updateNewtworkStatus(true);  
            //    alert( "On connect - " +this.dynamicData.networkConnection.value)
            }
            this.previousStatus = ConnectionStatusEnum.Online;
        }, error => alert('p'+error));
    }

}
