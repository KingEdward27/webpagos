import { HttpClient } from '@angular/common/http';
import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GenericListComponent } from 'src/app/base/components/generic-list/generic-list.component';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cnf-moneda',
  templateUrl: '../../base/components/generic-list/generic-list.component.html'
})

export class CnfMonedaComponent extends GenericListComponent implements OnInit{
  //baseEndpoint = environment.apiUrl + '/get-all-cnf-org';
  prop ={
    "tableName": "cnf_moneda",
    "title": "Moneda",
    "columnsList":[{tableName: "cnf_moneda", columnName:"nombre",filterType:"text"},
                   {tableName: "cnf_moneda",columnName:"isocode",filterType:"text"},
                   {tableName: "cnf_moneda",columnName:"descripcion",filterType:"none"},
                   {tableName: "cnf_moneda",columnName:"validini",filterType:"none"},
                   {tableName: "cnf_moneda",columnName:"validfin",filterType:"none"}],
    "columnsForm":[{tableName: "cnf_moneda", "columnName":"nombre","type":"input"},
                   {tableName: "cnf_moneda", "columnName":"isocode","type":"input"},
                   {tableName: "cnf_moneda", "columnName":"descripcion","type":"input"},  
                   {tableName: "cnf_moneda", "columnName":"validini","type":"date"},
                   {tableName: "cnf_moneda", "columnName":"validfin","type":"date"}
           ],
    //filters sería para filtros adicionales
    "filters":{"cnf_moneda.nombre":"","cnf_moneda.isocode":""},
    "orders":["nombre","isocode"]
  }
  constructor(private utilServices: UtilService,private httpClients:HttpClient,private routers: Router) { 
    super(utilServices,httpClients,routers);
  }
  ngOnInit(): void {
    super.baseEndpoint = this.baseEndpoint;
    super.properties = this.prop;
    console.log(this.prop);
    super.ngOnInit();
  }
  save(): void {
    console.log("test desde cnf-org");
  }
}

