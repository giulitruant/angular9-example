import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  
  private readonly baseUrl = 'http://localhost:3000/getChoferes';
  

  constructor(private http: HttpClient) { }

  getChoferes(): Observable<any>{

    return this.http.get(this.baseUrl);

  }
}
