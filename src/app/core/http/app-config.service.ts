import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig;

  constructor(private http: HttpClient) {
  }

  loadAppConfig() {
    return this.loadMainConfig();

  }

  getConfig() {
    return this.appConfig;

  }

  public getJSON(): Observable<any> {
    return this.http.get('app.config.json');

  }

  private loadMainConfig() {
    return this.getJSON()
    .toPromise()
    .then(data => {
      this.appConfig = data;
    });

  }
}
