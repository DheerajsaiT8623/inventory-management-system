import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  
  const currentUser = userService.getCurrentUser();
  if (!currentUser) {
    router.navigate(['/']);
    return false;
  }

  // Check if the route requires a specific role
  const requiredRole = route.data['role'] as string | undefined;
  if (requiredRole && currentUser.role !== requiredRole) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};