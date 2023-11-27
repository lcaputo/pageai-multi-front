import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const helper = new JwtHelperService();
    const tokenDecrypted = helper.decodeToken(
      localStorage.getItem('token') || ''
    );
    let isAdmin: boolean = false
    if (tokenDecrypted) {
      tokenDecrypted.roles.forEach((role: any) => {
        console.log(role.name);
        if (role.name === 'User') {
            isAdmin = true;
        }
      });
    }
    if(isAdmin) return true;
    return false;
  }
}
