import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig;

  constructor(private http: HttpClient) {
  }

  loadAppConfig() {

    if (environment.production) {
      return this.loadMainConfig();
    }

    return this.loadUserConfig();
  }

  getConfig() {
    return this.appConfig;
  }

  private loadMainConfig() {
    return this.http.get('app.config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  private loadUserConfig() {
    return this.http.get('app.config.json.user')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      }).catch(() => this.loadMainConfig());
  }
}
