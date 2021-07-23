import { Component, Input, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banner } from 'src/app/models/banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements AfterViewInit {

  @Input() banner: Banner;
  showAd = environment.adsense.show;
  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
      } catch (e) {
        console.error(e);
      }
    }, 0);
  }

}
