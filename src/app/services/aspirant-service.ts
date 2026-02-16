import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Aspirant } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AspirantService {
   private URLBase = 'http://localhost:3000/aspirantes';
  private httpClient = inject(HttpClient);

  private _aspirants = signal<Aspirant[]>([]);
  aspirants = this._aspirants.asReadonly();

  getAspirants(){
      return this.httpClient.get<Aspirant[]>(this.URLBase)
      .subscribe({
        next:aspirants=>this._aspirants.set(aspirants),
        error:error=>console.log(error)
      })
    }

  addAspirant(newAspirant:Omit<Aspirant,'id'>){
    return this.httpClient.post<Aspirant>(this.URLBase,newAspirant)
    .subscribe({
      next:aspirant=>this._aspirants.update((aspirants)=>[...aspirants,aspirant]),
      error:error=>console.log(error)
    })
  }

}
