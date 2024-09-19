import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAllSystems(){
    return this.http.get<any>(this.apiUrl + "/manager/getAllSystems");
  }

  getSystemGameList(idSystem: number){
    return this.http.get<any>(this.apiUrl + "/manager/getSystemGameList/" + idSystem);
  }

  downloadMultimedia(idSystem: number, multimediaTypes: any){
    const data = {
      idSystem: idSystem,
      multimediaTypes: multimediaTypes
    };
    return this.http.post(`${this.apiUrl}/manager/download`, data, this.getHeader()); 
  }

  deleteFile(filePath: string){
    const data = {
      filePath: filePath,
    };
    return this.http.post(`${this.apiUrl}/manager/deleteFile`, data, this.getHeader()); 
  }

  uploadFile(formData: FormData){
    return this.http.post(`${this.apiUrl}/manager/uploadFile`, formData); 
  }

  uploadMultipleFiles(formData: FormData){
    return this.http.post(`${this.apiUrl}/manager/uploadMultipleFiles`, formData); 
  }
  

  viewMultimedia(path: string) {
    const data = { path: path };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/manager/serve`, data, {
      headers: headers,
      responseType: 'blob' // Specify the response type as blob
    });
  }
  

  getHeader(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return httpOptions;
  }
}
