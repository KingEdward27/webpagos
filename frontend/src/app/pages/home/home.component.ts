import { Component, ElementRef, OnInit, SecurityContext, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({ 
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  innerHtml!: SafeHtml;
  modules!:any;
  moduleOptions!:any;
  optionsByProfle!:any;
  display:string = "none";
  printContainer!: HTMLElement
  loadingMenu:boolean = true;
  menuLoaded:number = 0;
  authorities:any;

  @ViewChild('fheader') fheader!: ElementRef<HTMLElement>;
  @ViewChild('fsidebar') fsidebar!: ElementRef<HTMLElement>;
  
  constructor(private router: Router,
              private domSanitizer: DomSanitizer,
              private elRef:ElementRef
              ) {
                
              // this.authorities = this.auth.getDecodeToken()['authorities'];
                /*this.staticHtmlService.getStaticHTML(utilService.getUrl()+'/getModules',false)
                .subscribe(response => {  this.replaceHtml(response )});*/
  }

              
  ngOnInit(): void {
    this.menuLoaded = 1;
    
    // this.auth.getModules().subscribe(val=>{
    //   this.modules = val;
    //   console.log(this.modules);
      this.loadingMenu = false;
    //   this.triggerFalseClick();
    // })

    console.log(this.authorities);
  }

  ngAfterContentInit(){
    console.log("LISTO");
    //this.revisarPermisos();
  }

  triggerFalseClick() {
    let he: HTMLElement = this.fheader.nativeElement;
    let el: HTMLElement = this.fsidebar.nativeElement;console.log("clicked");
    he.click();
    el.click();
}

  logout(){
    this.auth.logout()
    window.location.reload();
  }


  trackByFn(index:number,item:any){
    return item;
  }

  showSubmenu(element:HTMLElement){
    //element.setAttribute("display","none")
    console.log(element);
  }

  private replaceHtml(innerHTML: string): void {
    this.innerHtml = this.domSanitizer.bypassSecurityTrustHtml(innerHTML);
    this.modules = this.innerHtml;
  }

  convertToNumber(value:string){
    return parseFloat(value)
  }

  isEmptyObject(obj:Object) {
    return (obj && (Object.keys(obj).length === 0));
  }

  // expand(m:Module){
  //   m.expanded = !m.expanded;
  //   console.log(m.expanded);
  // }

  // expandSubmodule(m:ModuleOption){
  //   m.expanded = !m.expanded;
  // }
}
