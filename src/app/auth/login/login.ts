import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [SwalComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {

  private fb:FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  @ViewChild('swalSuccess') swalSuccess !: SwalComponent;
  @ViewChild('swalError') swalError !: SwalComponent;

  loginForm : FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required]]
  })

  login(){
    if(this.loginForm.invalid){
      this.swalError.fire();
    }

    this.authService.login(this.loginForm.value.email,this.loginForm.value.password)
    .subscribe({
      next:()=>{
        this.swalSuccess.fire();
        this.router.navigateByUrl('/');

      },
      error:()=>this.swalError.fire()
    })


    
  }
}
