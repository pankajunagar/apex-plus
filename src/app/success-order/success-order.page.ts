import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.page.html',
  styleUrls: ['./success-order.page.scss'],
})
export class SuccessOrderPage implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  browse() {
     this.router.navigateByUrl('/tabs/dashboard')
  }
}
