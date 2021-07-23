import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banner } from '../models/banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  banner: Banner;
  constructor() { }

  getAdsense(): Banner {
    return this.banner = new Banner(
      environment.adsense.adClient,
      environment.adsense.adSlot,
      environment.adsense.adFormat,
      true
    );
  }
}
