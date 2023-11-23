import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { AuthService } from '../servicios/auth.service';

export const pacienteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const auth = inject(Auth);
  const servAuth = inject(AuthService);

  return new Promise<boolean>(
    (resolve, reject) => {
      auth.onAuthStateChanged(
        (user: User | null) => {
          if (user && servAuth.usuarioActual?.tipo == 'admin') {
            resolve(true);
          } else {
            console.log('User is not admin');
            router.navigate(['/']);
            resolve(false);
          }
        }
      );
    }
  );
}
