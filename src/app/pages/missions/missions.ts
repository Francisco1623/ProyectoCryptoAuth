import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MissionsService } from '../../services/missions.service';
import { Mission } from '../../interfaces';

@Component({
  selector: 'app-missions',
  imports: [RouterLink],
  templateUrl: './missions.html',
})
export class Missions implements OnInit{
  
  private missionService = inject(MissionsService);
  
  missions = this.missionService.missions;

  ngOnInit(): void {
    this.missionService.getMissions();
  }
    
  
}
