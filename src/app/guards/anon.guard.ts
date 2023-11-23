import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';

export const anonGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const auth = inject(Auth);

  return new Promise<boolean>(
    (resolve, reject) => {
      auth.onAuthStateChanged(
        (user: User | null) => {
          if (user) {
            console.log('User is logged in');
            router.navigate(['/']);
            resolve(false);
          } else {
            resolve(true);
          }
        }
      );
    }
  );
};