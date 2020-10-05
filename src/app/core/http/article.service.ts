import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

    private get apiUrl(){
        return this.appConfig.getConfig().rootApiUrl;
    }

    constructor(
        private http: HttpClient,
        private appConfig: AppConfigService
        ){ }

        getArticles(){
            return this.http.get<any>(this.apiUrl + '/articles');

        }

        getArticle(title: any){
            return this.http.get(this.apiUrl + '/articles/' + title);

        }

        getTags(){
            return this.http.get<any>(this.apiUrl + '/tags');
        }

}