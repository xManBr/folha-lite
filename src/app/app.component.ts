import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Sidenav } from 'materialize-css';
import { NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import cookie from '../assets/pt.json';
import { CookieInterface } from './interface/cookie.interface';
//https://colinstodd.com/posts/code/how-to-install-materialize-css-in-angular.html

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contador-lite';
  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor(private ccService: NgcCookieConsentService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.ccService.getConfig().content = this.ccService.getConfig().content || {};
    // Override default messages with the translated ones
    this.ccService.getConfig().content.header = 'Cookies são usado neste site!';
    this.ccService.getConfig().content.message = 'Esse site usa cookies para garantir que você obtenha a melhor experiência.';
    this.ccService.getConfig().content.dismiss = 'Entendeu!';
    this.ccService.getConfig().content.allow = 'Aceita cookies';
    this.ccService.getConfig().content.deny = 'Rejeita';
    this.ccService.getConfig().content.link = 'Saiba Mais';
    this.ccService.getConfig().content.href = '#/privacy';
    this.ccService.getConfig().content.policy = 'Política de Cookie';
    this.ccService.destroy();//remove previous cookie bar (with default messages)
    this.ccService.init(this.ccService.getConfig()); // update config with translated messages
    /*
        // Support for translated cookies messages
        this.translateService.addLangs(['en', 'pt']);
        this.translateService.setDefaultLang('en');
    
        const browserLang = this.translateService.getBrowserLang();
        this.translateService.use(browserLang.match(/en|pt/) ? browserLang : 'en');
    
        let politica: CookieInterface = cookie;
        console.log(politica);
        console.log(politica.allow);
        this.translateService//
        //.get(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy'])
        .get(politica)
        .subscribe(data => {
            console.log(data);
            console.log(data['header']);
            this.ccService.getConfig().content = this.ccService.getConfig().content || {};
            // Override default messages with the translated ones
            this.ccService.getConfig().content.header = data['cookie.header'];
            this.ccService.getConfig().content.message = data['cookie.message'];
            this.ccService.getConfig().content.dismiss = data['cookie.dismiss'];
            this.ccService.getConfig().content.allow = data['cookie.allow'];
            this.ccService.getConfig().content.deny = data['cookie.deny'];
            this.ccService.getConfig().content.link = data['cookie.link'];
            this.ccService.getConfig().content.policy = data['cookie.policy'];
    
            this.ccService.destroy();//remove previous cookie bar (with default messages)
            this.ccService.init(this.ccService.getConfig()); // update config with translated messages
          });
          */
    //
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      var instances = Sidenav.init(elems, Option);
    });
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}
