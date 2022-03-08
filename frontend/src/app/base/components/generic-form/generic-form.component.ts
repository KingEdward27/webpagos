import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { UtilService } from 'src/app/services/util.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from '../../util/CustomDate';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',

  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class GenericFormComponent extends CommonService implements OnInit {

  //generic variables
  error: any;
  isDataLoaded: Boolean = false;
  isOk: boolean = false;
  isWarning: boolean = false;
  isDanger: boolean = false;
  message: any = "";

  //variables propias
  id: any;
  // listLists: any[] = [];
  constructor(private utilService: UtilService, private httpClient: HttpClient,
    private router: Router, private _location: Location) {
    super(httpClient);
  }
  ngOnInit(): void {
    this.isDataLoaded = false;
    this.baseEndpoint = environment.apiUrl;
    this.loadForm();
  }
  mapToObjectMap(map: any) {
    const convMap: any = {};
    map.forEach((val: string, key: string) => {
      convMap[key] = val;
    });
    return convMap;
  }
  load(columnForm: any, index: number) {
    console.log("waaa");
    if (columnForm.load) {
      console.log(this.properties);
      let column = columnForm?.tableName + "." + columnForm?.load.loadBy;
      let selectValue = (<HTMLInputElement>document.getElementById(column)).value;
      let myMap = new Map();
      myMap.set(columnForm.load.loadBy, selectValue);
      const convMap = this.mapToObjectMap(myMap);


      // this.properties.columnsForm.forEach((element2:any) => {
      //   for (let index = 0; index < this.listLists.length; index++) {
      //     const element = this.listLists[index];
      //     element.forEach((item: any) => {
      //       if (columnForm.load.tableName == item[2]) {
      //         if(columnForm.loadState == 0 && columnForm.loadFor == element2.loadFor){
      //           this.listLists[index] = [];
      //           this.listLists[index].push([0, "- Seleccione -", element2.tableName]);
      //         }
      //       }
      //     });


      //   }

      // });

      let prop = { "tableName": columnForm.load.tableName, "columnsListWithOutProp": columnForm.columnName, "filters": convMap };
      console.log(prop);

      super.getListComboWithFilters(prop).subscribe(data => {
        console.log(data);
        data.push([0, "- Seleccione -", columnForm.load.tableName]);
        data.sort();
        this.properties.columnsForm.forEach((element: any) => {

          if (columnForm.load.tableName == element.tableName) {
            element.value = 0;
            element.listData = data
          }
          if (element.order > columnForm.order + 1) {
            let dataVacia: any[] = [];
            dataVacia.push([0, "- Seleccione -", element.tableName]);
            element.listData = dataVacia;

          }
        });
      });
    }
    console.log(this.properties);
  }
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split("-");
      return {
        year : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        day : parseInt(date[2], 10)
      };
    }
    return null;
  }
  format(date: NgbDateStruct | null): string {
    return date ? this.leftPad(date.day.toString(),2,'0') + "/" + this.leftPad(date.month.toString(),2,'0') 
    + "/" + date.year : '';
  }
  leftPad(str: string, len: number, ch='.'): string {
    len = len - str.length + 1;
    return len > 0 ?
      new Array(len).join(ch) + str : str;
  }
  async loadForm() {
    this.properties = JSON.parse(localStorage.getItem("properties") || '{}');
    for (let index = 0; index < this.properties.columnsForm.length; index++) {
      const element = this.properties.columnsForm[index];
      element.order = index + 1;
    }
    await this.properties.columnsForm.forEach((element: any) => {
      if (element.type == 'date') {
        let wa = this.format(this.fromModel(element.value));
        console.log(wa);

        element.value = wa;
      }

      if (element.type != 'input' && element.type != 'date') {
        if (this.properties.id == 0) {
          if (element.loadState == 1) {
            super.getListComboByTableName(element.tableName, element.columnName).subscribe(data => {
              data.push([0, "- Seleccione -"]);
              data.sort();
              element.listData = data;
            });
          } else {
            let dataVacia: any[] = [];
            dataVacia.push([0, "- Seleccione -"]);
            element.listData = dataVacia;
          }
        } else {
          if (element.loadState == 1) {
            super.getListComboByTableName(element.tableName, element.columnName).subscribe(data => {
              console.log(data);
              data.push([0, "- Seleccione -"]);
              data.sort();
              element.listData = data;
            });
          }

        }

      }
    });
    this.properties.columnsForm.forEach((element: any) => {
      if (element.type != 'input' && element.type != 'date') {
        if (this.properties.id != 0) {
          if (element.load) {
            console.log(element);
            // let column = element?.load.tableName + "." + element?.load.loadBy;
            let selectValue = element.value;
            let myMap = new Map();
            myMap.set(element?.load.loadBy, selectValue);
            const convMap = this.mapToObjectMap(myMap);
            let prop = { "tableName": element.load.tableName, "columnsListWithOutProp": "name", "filters": convMap };
            console.log(prop);
            super.getListComboWithFilters(prop).subscribe(data2 => {
              // console.log(element.order+1);
              console.log(data2);

              // this.properties.columnsForm.forEach(element => {

              // });
              let nextElement = this.properties.columnsForm[element.order];
              console.log(nextElement)
              data2.push([0, "- Seleccione -"]);
              data2.sort();
              if (nextElement) {
                nextElement.listData = data2;
              }
              console.log(this.properties);
              // element.listData = data;
            });
          }
        }
      }

    });


    this.isDataLoaded = true;
    console.log(this.properties);
  }
  loadData() {
    if (this.properties.id) {
      //cargar datos
      //pintarlos en los inputs
    }
  }
  back() {
    this._location.back();
  }
  save() {
    let myMap = new Map();
    myMap.set("id", this.properties.id ? this.properties.id : 0);
    this.properties.columnsForm.forEach((element: any) => {
      if (!element.load) {
        let column = "";
        if (element.type == "input" || element.type == "date") {
          column = element?.tableName + "." + element?.columnName;
          let selectValue = (<HTMLInputElement>document.getElementById(column)).value;
          element.value = selectValue;
          myMap.set(element.columnName, selectValue);

        } else {
          column = element?.tableName + "." + element?.relatedBy;
          let selectValue = (<HTMLInputElement>document.getElementById(column)).value;
          element.value = selectValue;
          myMap.set(element.relatedBy, selectValue);
        }

      }
    });
    const convMap: any = {};
    myMap.forEach((val: string, key: string) => {
      convMap[key] = val;
    });
    this.properties.filters = convMap;
    console.log(this.properties);
    super.create(this.properties).subscribe(data => {
      console.log(data);
      this.utilService.msgOkSave();
      this.back();
    }, err => {

      //error en validaciones, los demas errores en JwtInterceptor
      if (err.status === 422) {
        this.error = err.error;
      }
      console.log(this.error[0]);
    });
  }
}

