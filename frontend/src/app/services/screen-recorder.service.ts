import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScreenRecorderService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  startRecording(fps: string){
    return this.http.get<any>(this.apiUrl + "/screen-recorder/start/" + fps);
  }

  stopRecording(){
    return this.http.get<any>(this.apiUrl + "/screen-recorder/stop");
  }

  getCaptureList(){
    return this.http.get<any>(this.apiUrl + "/screen-recorder/list")
  }

}
