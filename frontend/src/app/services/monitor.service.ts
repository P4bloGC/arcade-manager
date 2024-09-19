import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getSystemInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/monitor");
  }
}
