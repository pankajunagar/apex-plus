/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductdetailresolverService } from './productdetail/productdetailresolver.service';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  //  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'productdetail', loadChildren: './productdetail/productdetail.module#ProductdetailPageModule' }, //resolve:{productData : ProductdetailresolverService}, 
  { path: 'productlist', loadChildren: './productlist/productlist.module#ProductlistPageModule' },
  // { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  // { path: 'download', loadChildren: './download/download.module#DownloadPageModule' },
  { path: 'installationlist', loadChildren: './installationlist/installationlist.module#InstallationPageModule' },
  { path: 'productcategory', loadChildren: './productcategory/productcategory.module#ProductcategoryPageModule' },
  // { path: 'wishlist', loadChildren: './wishlist/wishlist.module#WishlistPageModule' },
  { path: 'enquiry', loadChildren: './enquiry/enquiry.module#EnquiryPageModule' },
  { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusPageModule' },
  { path: 'contactus', loadChildren: './contactus/contactus.module#ContactusPageModule' },
  { path: 'view-image', loadChildren: './view-image/view-image.module#ViewImagePageModule' },
  { path: 'order-product', loadChildren: './order-product/order-product.module#OrderProductPageModule' },
  { path: 'success-order', loadChildren: './success-order/success-order.module#SuccessOrderPageModule' },
  { path: 'network-state', loadChildren: './network-state/network-state.module#NetworkStatePageModule' },






];

@NgModule({
  imports: [RouterModule.forRoot(routes), IonicModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
