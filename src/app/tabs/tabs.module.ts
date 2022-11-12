import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: TabsPage
//   }
// ];

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      
        { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardPageModule' },
      
        { path: 'productcategory', loadChildren: '../productcategory/productcategory.module#ProductcategoryPageModule' },
       
        { path: 'download', loadChildren: '../download/download.module#DownloadPageModule' },
        { path: 'wishlist', loadChildren: '../wishlist/wishlist.module#WishlistPageModule' },
       
        { path: 'search', loadChildren: '../search/search.module#SearchPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/dashboard',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
