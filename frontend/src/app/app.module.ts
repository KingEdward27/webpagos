import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenericFormComponent } from './base/components/generic-form/generic-form.component';
import { GenericListComponent } from './base/components/generic-list/generic-list.component';
import { translatePartialLoader } from './config/translation.config';
import { CompanyFormComponent } from './pages/company/form/company-form.component';
import { CompanyListComponent } from './pages/company/list/company-list.component';
import { CnfEmpresaComponent } from './pages/cnf-empresa/cnf-empresa';
import { CnfMonedaComponent } from './pages/cnf-moneda/cnf-moneda';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CnfRegionComponent } from './pages/cnf-region/cnf-region';
import { CnfProvinciaComponent } from './pages/cnf-provincia/cnf-provincia';
import { CnfDistritoComponent } from './pages/cnf-distrito/cnf-distrito';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CompanyFormComponent,
    CompanyListComponent,
    GenericListComponent,
    GenericFormComponent,
    CnfEmpresaComponent,
    CnfMonedaComponent,
    CnfRegionComponent,
    CnfProvinciaComponent,
    CnfDistritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translatePartialLoader,
        deps: [HttpClient],
      }
      })
  ],
  providers: [
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http:HttpClient){
	return new TranslateHttpLoader(http);
}