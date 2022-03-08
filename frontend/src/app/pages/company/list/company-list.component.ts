
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Company } from '../cnf-company.model';
import { CompanyService } from '../cnf-company.service';

// import Swal from 'sweetalert2';
// import { State } from 'src/app/models/State';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  lista: any;
  dtOptions: DataTables.Settings = {};
  nameSearch: string = "";
  modelSearch: Company = new Company();
  dataTable!: DataTables.Api;
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    console.log("waaa");
    
    this.getAllData();
  }
  public getAllDataByFilters() {
    this.companyService.getAllData(this.modelSearch)
      .subscribe(data => {
        this.lista = data;
      });
  }
  public getAllData() {
    console.log(this.modelSearch);
    this.companyService.getAllData(this.modelSearch)
      .subscribe(data => {
        this.lista = data;
        setTimeout(() => {
          this.dataTable = $('#dtData').DataTable({
            retrieve: true,
            pagingType: 'full_numbers',
            pageLength: 25,
            searching: false,
            processing: true,
            lengthMenu: [25, 50, 100],
            order: [[0, "asc"]],
            language: {
              emptyTable: '',
              zeroRecords: 'No hay coincidencias',
              lengthMenu: 'Mostrar _MENU_ elementos',
              search: 'Buscar:',
              info: 'De _START_ a _END_ de _TOTAL_ elementos',
              infoEmpty: 'De 0 a 0 de 0 elementos',
              infoFiltered: '(filtrados de _MAX_ elementos totales)',
              paginate: {
                first: 'Prim.',
                last: 'Últ.',
                next: 'Sig.',
                previous: 'Ant.'
              }
            }
          });
        }, 1);
        console.log(data);
      });
    this.dataTable.destroy();
  }
  Eliminar(e: Company) {
    console.log(e);
    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confirmar!'
    }).then((result) => {
      if (result.value) {
        this.companyService.delete(e.id.toString()).subscribe(() => {
          Swal.fire('Eliminación de registro:', `Eliminado con éxito`, 'success');
          this.getAllData();
        }, err => {
          if (err.status === 500 && err.error.trace.includes("DataIntegrityViolationException")) {
            Swal.fire({
              title: 'Problema al eliminar',
              text: `Se encontraron tablas relacionadas a esta entidad`,
              icon: 'error'
            });

          }
        });
      }
    });
  }
}
