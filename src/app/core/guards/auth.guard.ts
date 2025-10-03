import { inject } from '@angular/core';
import { Router, type CanActivateFn, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const currentUser = userService.getCurrentUser();
  if (!currentUser) {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  // Check if the route requires a specific role
  const requiredRole = route.data?.['role'] as string | undefined;
  if (requiredRole && currentUser.role !== requiredRole) {
    return router.createUrlTree(['/dashboard']);
  }

  return true as boolean | UrlTree;
};