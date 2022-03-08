import { NgModule } from '@angular/core';


import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { TranslateDirective } from './language/translate.directive';

@NgModule({
  imports: [],
  declarations: [
    FindLanguageFromKeyPipe,
    TranslateDirective
  ],
  exports: [
    FindLanguageFromKeyPipe,
    TranslateDirective
  ],
})
export class SharedModule {}
