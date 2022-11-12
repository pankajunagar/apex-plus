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
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicRouteStrategy } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { NativeHttpModule, NativeHttpBackend, NativeHttpFallback } from 'ionic-native-http-connection-backend';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PopupMenuComponent } from './popup-menu/popup-menu.component';
import { File } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer , FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { CacheModule } from "ionic-cache";
import { Network } from '@ionic-native/network/ngx';
import { NetworkProvider } from './network-provider.service';
import { IonicImageLoader } from 'ionic-image-loader';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { HttpModule } from '@angular/http';
//import { HighlightSearchPipe } from './highlight-search.pipe';
import { Downloader } from '@ionic-native/downloader/ngx';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';


@NgModule({
  declarations: [AppComponent, PopupMenuComponent,ProgressBarComponent],
  entryComponents: [PopupMenuComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpModule,
    CacheModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NativeHttpModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    IonicImageLoader.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    File,
    FilePath,
    FileTransfer,
    FileOpener,
    DocumentViewer,
    Keyboard,
    Geolocation,
    NativeGeocoder,
    Network,
    NetworkProvider,
    WebView,
    Downloader,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
