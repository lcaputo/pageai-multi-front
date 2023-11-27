import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { CustomHttpService } from './http.service';
import { IAuth } from './../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _httpService: CustomHttpService) {}

  login(payload: IAuth) {
    return this._httpService.post('login', payload);
  }

}
