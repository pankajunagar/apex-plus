import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpcallsService } from '../services/httpcalls.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.page.html',
  styleUrls: ['./order-product.page.scss'],
})
export class OrderProductPage implements OnInit {

  productRelatedDetails;
  productData;
  addressForm: FormGroup;
  //selected = "COD"
  constructor(
    private router: Router,
    private _FB: FormBuilder,
    private http : HttpcallsService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    this.productRelatedDetails  = JSON.parse(this.activatedRoute.snapshot.paramMap.get('list'));
    this.productData = this.productRelatedDetails.product_view_data[0]
    console.log(this.productRelatedDetails)
    this.addressForm = this._FB.group({      
      full_name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),    
      mobile_no: new FormControl('', Validators.required),
      paymentType: new FormControl('COD', Validators.required)
    });
  }

  orderNow(){
    let params = this.addressForm.value;    
    console.log(params)
    this.router.navigate(['success-order', {}])
    // this.http.postRequest('profile/addAddress.php', {
    //      full_name: params['full_name'], address: params['address'], land_mark: params['land_mark'],
    //      state: params['state'], city: params['city'],
    //      pincode: params['pincode'], mobile_no: params['mobile_no'], 
    //      address_type: params['address_type'] }).subscribe(response=>{
    //   if(response['success']){
         
    //   }
    // })
  }
 
}
