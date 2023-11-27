import { Injectable } from '@angular/core';
import { HttpHeaderService } from './http-header.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _httpHeaderService: HttpHeaderService
  ) {}

  get(path: string) {
    const headers = this._httpHeaderService.getHeaders();
    return this._http.get(`${environment.backendUrl}/${path}`, { headers });
  }

  post(path: string, data: any = {}) {
    const headers = this._httpHeaderService.getHeaders();
    return this._http.post(`${environment.backendUrl}/${path}`, data, { headers });
  }

  delete(path: string) {
    const headers = this._httpHeaderService.getHeaders();
    return this._http.delete(`${environment.backendUrl}/${path}`, { headers });
  }
}
