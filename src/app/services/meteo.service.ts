import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import {environment} from "src/environments/environments"
@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  key= environment.meteokey; 
  host = environment.meteohost; 
  constructor(private http: HttpClient) {
  }

  getMeteo1jour(ville: string): Observable<any> {
    return this.http.get(this.host+'weather?q=' + ville + "&appid=" + this.key)
  }
    getMeteo5jour(ville: string): Observable<any> {
    return this.http.get(this.host+"forecast?q="+ville+"&appid=" + this.key)
    }
  
}
