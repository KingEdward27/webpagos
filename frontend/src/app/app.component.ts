import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pagos-app';
  constructor(private translate: TranslateService,private utilService:UtilService) {
    this.setAppLanguage();
  }
  setAppLanguage() {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang("es");
    let lang = localStorage.getItem('lang');
    this.translate.use(lang?lang:"es");
    // this.translate.use(this.translate.getBrowserLang());

    // const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang.match(/es|en/) ? browserLang : 'en');
  }
}
