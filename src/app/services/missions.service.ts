import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Mission } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MissionsService {
  
  private URLBase = 'http://localhost:3000/misiones';
  private httpClient = inject(HttpClient);

  private _missions = signal<Mission[]>([]);
  missions = this._missions.asReadonly();

  getMissions(){
    return this.httpClient.get<Mission[]>(this.URLBase)
    .subscribe({
      next:missions=>this._missions.set(missions),
      error:error=>console.log(error)
    })
  }

  getMissionById(id:string){
    return this.httpClient.get<Mission>(`${this.URLBase}/${id}`);
  }

  addMission(mission:Omit<Mission,'id'>){
    this.httpClient.post<Mission>(this.URLBase,mission)
    .subscribe({
      next:mission=>this._missions.update((missions)=>[...missions,mission]),
      error:error=>console.log(error)
    })
  }
/*
Editar la mission todavía no está implementado
  editMission(id:string){
    this.httpClient.put<Mission>(this.URLBase,mission)
    .subscribe({
      next:mission=>this._missions.update((missions)=>[...missions,mission]),
      error:error=>console.log(error)
    })
  }
*/
   deleteMission(id:string){
    this.httpClient.delete<Mission>(`${this.URLBase}/${id}`)
    .subscribe({
      next:mission=>{
        this._missions.update((missions)=>[...missions.filter(m=>m.id!==id)])
      },
      error:error=>console.log(error)
    })
  }

}
