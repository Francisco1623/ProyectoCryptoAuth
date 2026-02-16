import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-login',
  imports: [SwalComponent, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class Login {

  private fb:FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

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

    
  }
}
