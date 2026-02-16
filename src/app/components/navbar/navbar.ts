import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../auth/services/auth-service';
import { User } from '../../auth/interfaces';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar{
  
  private authService = inject(AuthService);
  private router = inject(Router);
  user = this.authService.user;
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  
}
