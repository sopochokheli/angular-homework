import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {map, Observable} from "rxjs";
import {Auth, user} from "@angular/fire/auth"; // Import your AuthService

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return user(this.auth).pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      })
    );
  }
}
