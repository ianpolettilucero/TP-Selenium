import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

   url: string = 'http://localhost:3000/';
   

  constructor(private http: HttpClient) {}

  public login(body: any) {
    return this.http.post(this.url + "usuarios/login", body)
  }
}
