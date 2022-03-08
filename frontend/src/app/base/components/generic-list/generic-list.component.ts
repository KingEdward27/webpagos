import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';
import { UtilService } from 'src/app/services/util.service';
import { CustomAdapter, CustomDateParserFormatter } from '../../util/CustomDate';



@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class GenericListComponent extends CommonService implements OnInit {

  //generic variables

  modelSearch: any;
  error: any;
  headers: any;
  listDetail: any;
  load: boolean = false;
  listDetail2: any[][] = [];
  dataTable!: DataTables.Api;
  @Output() result: EventEmitter<any> = new EventEmitter();
  constructor(private utilService: UtilService, private httpClient: HttpClient, private router: Router) {
    super(httpClient);
  }
  ngOnInit(): void {
    this.load = false;
    this.headers = this.properties.headers;
    //aqui cargar metadata, nullable, tamaño, etc
    this.properties.columnsForm.forEach((element: any) => {
      element.isNull = false;
    });
    this.getListData();
  }
  getListData() {

    this.baseEndpoint = environment.apiUrl;

    console.log(this.properties);
    super.getList(this.properties)
      .subscribe(data => {
        this.listDetail = data;
        console.log(this.headers);
        console.log(this.listDetail);
        setTimeout(() => {
          this.dataTable = $('#dtData'+this.properties.tableName).DataTable(this.utilService.datablesSettings);
        }, 1);
        // console.log(data);
      });
    if (this.dataTable != undefined) {
      this.dataTable?.destroy();
    }
  }
  goToForm() {
    this.properties.id = 0;
    localStorage.setItem("properties", JSON.stringify(this.properties));
    this.router.navigate(["/generic-form"]);
  }
  goToFormToEdit(id: any) {
    this.properties.id = id;
    
    // console.log(this.properties);
    // let listColumns:any[] = [];
    // this.properties.columnsForm.forEach((element:any) => {
      
    //   if(this.properties.tableName == element.tableName){
    //     listColumns.push(element.columnName);
    //   }
    //   if(element.relatedBy){
    //     listColumns.push(element.relatedBy);
    //   }
      
    // });
    // console.log(listColumns);
    
    super.getData(this.properties).subscribe(data => {
      console.log(data);
      let index = 0;
      // data.prototype.forEach((value: boolean, key: string) => {
      //     console.log(key, value);
      // });
      // var resultArray = Object.keys({}).map(function(personNamedIndex:any){
      //     let person = data[personNamedIndex];
      //     // do something with person
      //     console.log(person);
          
      // });
      let objects = [];
      for (let key in data) {
        // const convMap: any = {};
        // let key2 = key.replace("__",".");
        // convMap[key2] = data[key];
        // objects.push(convMap);
        const convMap: any = [];
        let key2 = key.replace("__",".");
        convMap[0] = key2;
        convMap[1] = data[key];
        objects.push(convMap);
      }
      console.log(objects);
      for (const element of objects) {
        let tablaAndColumndArr = element[0].split(".");
        for (const element2 of this.properties.columnsForm) {
          let tableAndColumn = element2.tableName + "." +element2.columnName;
          if((element[0] == tableAndColumn && (element2.type == 'input' || element2.type == 'date'))){
            element2.value = element[1];
            console.log(element[1]);
            break;
          }
          if(tablaAndColumndArr[0] == element2.tableName && element2.type == 'select' &&  
          (element2.relatedBy == tablaAndColumndArr[1] || element2.load?.loadBy == tablaAndColumndArr[1])){
            element2.value = element[1];
            break;
          }
          // let tablaAndColumnd = element[0].split(".");
          // // console.log(tablaAndColumnd);
          // if(tablaAndColumnd[0] == element2.tableName && element2.columnName != tablaAndColumnd[1]){
          //   element2.value = element[1];
          //   break;
          // }
        }
      }
      // objects.forEach(element => {
      //   this.properties.columnsForm.forEach((c:any) => {
      //     if(element[0] == element2.tableName + "." +element2.columnName){
      //       element2.value = element[1];
      //     }
      //     let tablaAndColumnd = element[0].split(".");

      //     if(tablaAndColumnd[0] == element2.tableName && element2.columnName != tablaAndColumnd[1]){
      //       element2.value = element[1];
      //     }
      //     // if(this.properties.tableName == element.tableName){
      //     //   index++;
      //     //   this.properties.columnsForm[index].value = data[index];
      //     // }
      //     // if(element.relatedBy){
      //     //   index++;
      //     //   this.properties.columnsForm[index].value = data[index];
      //     // }
          
      //   });
      // });
      
      localStorage.setItem("properties", JSON.stringify(this.properties));
      // for (let index = 0; index < this.properties.columnsForm.length; index++) {
      //   if(this.properties.tableName == this.properties.columnsForm[index].tableName){
      //     this.properties.columnsForm[index].value = data[index];
      //   }
      // }
      // for (let index = 0; index < data.length; index++) {
      //   const element = data[index];
      //   this.properties.columnsForm[index].value = element;
      //   // for (let index2 = 0; index2 < this.properties.columnsForm.length; index2++) {
      //   //   const element = this.properties.columnsForm[index2];
      //   //   if(index == index2){
      //   //     this.properties.columnsForm[index2].value = element;
      //   //   }

      //   // }
      // }
      console.log(this.properties);
      this.router.navigate(["/generic-form"]);
    });
    
  }
  delete(id: any) {
    this.utilService.confirmDelete(id).then((result) => { 
      if(result){
        this.remove(this.properties.tableName, id).subscribe(() => {
          this.utilService.msgOkDelete();
          this.getListData();
        });
      }
      
    });
  }
  getListWithParams() {
    // let filters:any[] = [];
    let myMap = new Map();
    this.properties.columnsList.forEach((element: any) => {
      console.log(element)
      if (element.filterType != 'none') {
        let inputFilter = (<HTMLInputElement>document.getElementById(element.tableName + '.' + element.columnName)).value;
        if (inputFilter) {
          myMap.set(element.tableName + '.' + element.columnName, inputFilter);
        }
      }

    });
    const convMap: any = {};
    myMap.forEach((val: string, key: string) => {
      convMap[key] = val;
    });
    console.log(convMap);
    this.properties.filters = convMap;
    console.log(this.properties);

    super.getListWithFilters(this.properties).subscribe(data => {
      this.listDetail = data;
      console.log(this.listDetail);
      setTimeout(() => {
        this.dataTable = $('#dtData').DataTable(this.utilService.datablesSettings);
      }, 1);
      // console.log(data);
    });
    if (this.dataTable != undefined) {
      this.dataTable?.destroy();
    }
  }
}

