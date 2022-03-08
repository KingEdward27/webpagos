import { Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../cnf-company.model';
import { CompanyService } from '../cnf-company.service';


@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html'
})
export class CompanyFormComponent implements OnInit{

  //generic variables
  error: any;
  selectedItemsList = [];
  checkedIDs = [];
  chargingsb:boolean = true;
  isDataLoaded :Boolean = false;
  isOk:boolean=false;
  isWarning:boolean=false;
  isDanger:boolean=false;
  message:any="";

  //variables propias
  public model : Company = new Company();
  form!: FormGroup;
  protected redirect: string = "/company";
  selectedOption:any;
  passwordRepeat:any;

  constructor(private companyService:CompanyService, 
              private router: Router, 
              private route: ActivatedRoute,) { 
  }
  ngOnInit(): void {
    this.isDataLoaded = false;
    this.loadData();

  }
  
  loadData(){
    return this.route.paramMap.subscribe(params => {
      let id: string;
      id = params.get('id')!;
      console.log(id);
      if(!id){
        this.isDataLoaded = true;
      }
      if(id){
        this.companyService.getData(id).subscribe(data => {
          this.model = data;
          console.log(this.model);
          this.isDataLoaded = true;
          //this.titulo = 'Editar ' + this.nombreModel;
        });
      }
      
    });
    
  }
  public save(): void {
    this.companyService.save(this.model).subscribe(m => {
      console.log(m);
      this.isOk = true;
      Swal.fire('Registro',`Grabado con éxito`, 'success');
      this.router.navigate([this.redirect]);
    }, err => {
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error["cnfTenant.name"]);
      }
    });
  }
  
}

