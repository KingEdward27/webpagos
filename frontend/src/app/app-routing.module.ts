import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericFormComponent } from './base/components/generic-form/generic-form.component';
import { AuthGuard } from './config/auth.guard';
import { CompanyFormComponent } from './pages/company/form/company-form.component';
import { CompanyListComponent } from './pages/company/list/company-list.component';
import { CnfEmpresaComponent } from './pages/cnf-empresa/cnf-empresa';
import { CnfMonedaComponent } from './pages/cnf-moneda/cnf-moneda';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CnfRegionComponent } from './pages/cnf-region/cnf-region';
import { CnfProvinciaComponent } from './pages/cnf-provincia/cnf-provincia';
import { CnfDistritoComponent } from './pages/cnf-distrito/cnf-distrito';


const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'company',component: CompanyListComponent},
      {path: 'company-form',component: CompanyFormComponent},
      {path: 'generic-form',component: GenericFormComponent},
      {path: 'empresa',component: CnfEmpresaComponent},
      {path: 'moneda',component: CnfMonedaComponent},
      {path: 'region',component: CnfRegionComponent},
      {path: 'provincia',component: CnfProvinciaComponent},
      {path: 'distrito',component: CnfDistritoComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash:true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
