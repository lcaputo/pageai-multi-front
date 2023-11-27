import { Injectable } from '@angular/core';
import { CustomHttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';
import { IUser } from './../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ActiveUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({} as IUser);
  ActiveUser$ = this.ActiveUser.asObservable();

  constructor(
    private readonly _httpService: CustomHttpService,
  ) { }

  getUsers() {
    return this._httpService.get('obtener_usuarios');
  }

  createUser(user: any) {
    return this._httpService.post('crear_usuario', user);
  }

  getAllUsers() {
    return this._httpService.get('obtener_usuarios');
  }

  decodeToken(token: string) {
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const payloadJSON = JSON.parse(payloadDecoded);
    this.getAllUsers().subscribe({
      next: (users: any) => {
        const user = users.find((user: any) => user.email === payloadJSON.email);
        this.ActiveUser.next(user);
      }
    })
  }

}
