import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isUserLoggedIn()) {
    return true; // User is authenticated
  } else {
    router.navigate(['/login']); // Redirect to login if user is not authenticated
    return false;
  }
};