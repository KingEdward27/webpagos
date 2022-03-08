import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
          
        // if (this.authenticationService.currentUserValue) {
        //   this.router.navigate(['']);
        // }
  }

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(1)]],
      password: ['', [Validators.required,Validators.minLength(1)]]
    })
  }
  
  get f() { return this.loginForm.controls; }
  
  login(){

    this.submitted = true;
    console.log("login ...!", this.loginForm.invalid)

    if (this.loginForm.invalid){
      return;
    }

    this.loading = true;
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             console.log(data, "ddddddddd")
    //             this.router.navigate(['profile']);
    //         },
    //         error => {
    //             //this.error = error;
    //             //this.loading = false;
    //             console.log(error," zzzzzz") 
    //             this.loading = false;
    //         });

  }

  // logout(){
  //   this.authenticationService.logout()
  // }

}
