import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss'],
})
export class PopupMenuComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private router: Router
  ) { }

  ngOnInit() {}

  enquiry(){
    this.popoverController.dismiss();
    this.router.navigate(['enquiry',{}])
  }

  contactus(){
    this.popoverController.dismiss();
    this.router.navigate(['contactus',{}])
  }

  aboutus(){
    this.popoverController.dismiss();
    this.router.navigate(['aboutus',{}])
  }
}
