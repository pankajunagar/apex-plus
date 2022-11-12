import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionsService } from '../functions.service';
import { DynamicDataService } from '../services/dynamic-data.service';


@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.page.html',
  styleUrls: ['./view-image.page.scss'],
})
export class ViewImagePage implements OnInit {

  img = [];
  title;
  index = '0';
  //isOffline;


  slideOpts_view = {
    zoom: true,
    initialSlide: this.activatedRoute.snapshot.paramMap.get('index')
  };



  constructor(
    private activatedRoute: ActivatedRoute,
    private fun: FunctionsService,
    private dynamicData: DynamicDataService,
    private router: Router
  ) {
    this.index = this.activatedRoute.snapshot.paramMap.get('index');
  }

  ngOnInit() {
    this.dynamicData.networkConnection.subscribe(status => {
      if (status) {
        this.img = JSON.parse(this.activatedRoute.snapshot.paramMap.get('img'));
        this.title = this.activatedRoute.snapshot.paramMap.get('title');
        this.index = this.activatedRoute.snapshot.paramMap.get('index');
      }
      else if (!status) {
        //  this.router.navigate(['network-state'])
      }
    })
    //isOffline
    // this.isOffline = this.activatedRoute.snapshot.paramMap.get('isOffline');
  }

  ngOnChanges() {
    this.ngOnInit();
    this.slideOpts_view = {
      zoom: true,
      initialSlide: this.activatedRoute.snapshot.paramMap.get('index')
    }
  }

  ngAfterContentInit(): void {
    this.slideOpts_view = {
      zoom: true,
      initialSlide: this.activatedRoute.snapshot.paramMap.get('index')
    }
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }

  back() {
    this.fun.back();
  }

}
