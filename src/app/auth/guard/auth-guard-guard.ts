import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuardGuard = (role:string)=>{

return (route:string, state:string) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.user()?.role.toLocaleUpperCase()===role){
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
}