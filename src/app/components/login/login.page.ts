import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class LoginPage implements OnInit {
  constructor(private fb: FormBuilder, private readonly http: HttpClient) {}

  loginForm: FormGroup = this.fb.group({
    email: [''],
    password: [''],
  });

  ngOnInit() {}

  login() {
    this.http
      .post('https://pageai-multiplataforma.onrender.com/login', this.loginForm.value)
      .subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        const helper = new JwtHelperService();
        const tokenDecrypted = helper.decodeToken(
          localStorage.getItem('token') || ''
        );
        if (tokenDecrypted) {
          tokenDecrypted.roles.forEach((role: any) => {
            console.log(role.name);
            if (role.name === 'Admin') {
              window.location.href = '/dashboard';
            } else if (role.name === 'User') {
              window.location.href = '/posts';
            }
          });
        }
      });
  }
}
