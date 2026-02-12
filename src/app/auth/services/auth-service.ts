import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginResponse, User, JWTPayload } from '../interfaces/index';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private URLBase = 'http://localhost:3000';

  private httpClient = inject(HttpClient);

  private _user = signal<User | null>(null);

  user = this._user.asReadonly();

  constructor(){
    const token = localStorage.getItem('token_crypto') || '';

    if(token){
      this.verifyToken(token)
      .subscribe({
        next:response=>{
          const {id,email,alias,role,nombre} = jwtDecode<JWTPayload>(token);
          this._user.set({id,email,alias,role,nombre})
        },
        error:error=>localStorage.removeItem('token_crypto')
      })

    }
  }

  verifyToken(token:string){
    const headers : HttpHeaders = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.httpClient.get(`${this.URLBase}/missions`,{
      headers
    })
  }

  login(email:string, password:string){
    return this.httpClient.post<LoginResponse>(`${this.URLBase}/login`,{email,password})
    .pipe(
      tap(response=>{
        this._user.set(response.user);
        localStorage.setItem('token_crypto',response.token);
      })
    )
  }

  logout(){
    this._user.set(null);
    localStorage.removeItem('token_crypto');
  }
  
}


