import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {

  constructor() { }

  getHeaders(additionalHeaders: HttpHeaders = new HttpHeaders()): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, PUT, DELETE, HEAD'
    );
    headers = headers.append(
      'Access-Control-Allow-Headers',
      'X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept'
    );
    headers = headers.append('Access-Control-Max-Age', '1728000');
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }


}
