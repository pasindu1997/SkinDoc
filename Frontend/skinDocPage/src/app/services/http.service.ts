import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(serviceName: string, data: any) {
    const headers = new HttpHeaders();
    const options = { headers, withCredintials: false };
    const url = 'http://localhost:3000/users/' + serviceName;
    console.log(url);
    return this.http.post(url, {email : data.email, password : data.password} , options);
  }
}
