import { Component, OnInit } from '@angular/core';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-network-state',
  templateUrl: './network-state.page.html',
  styleUrls: ['./network-state.page.scss'],
})
export class NetworkStatePage implements OnInit {

  constructor(
    private popoverController : PopoverController,
  ) { }

  ngOnInit() {
  }



}
