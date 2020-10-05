import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/http/alert.service';
import { ArticleService } from 'src/app/core/http/article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  id: any;
  article: any;

  constructor(
    private route: ActivatedRoute,
    private service: ArticleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    debugger;
    this.route.params.subscribe(param => {
      this.id = param['id'];
    });

    this.appConfig();
  }

  appConfig(){
    this.service.getArticle(this.id)
    .toPromise().then((res: any) => {
      console.dir(res);
      if (res.article !== undefined && res.article){
        this.article = res.article;
        console.dir(this.article);
      } else{
        this.alertService.error('Articulo no encontrado');
      }
    })
    .catch(error => { alert(error); });


  }

}
