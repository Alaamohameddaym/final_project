import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const checkGuard: CanActivateFn = (route, state) => {
  let authgard:AuthService=inject(AuthService)
  let router=inject(Router)
  if(authgard.userData.getValue()==null){
    return true
  }
     router.navigate(['/home'])
    return false;
  };
  
