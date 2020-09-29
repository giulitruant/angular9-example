import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/core/http/article.service';

@Component({
  selector: 'app-home-article',
  templateUrl: './home-article.component.html',
  styleUrls: ['./home-article.component.scss']
})
export class HomeArticleComponent implements OnInit {

  articles: any;

  constructor(
    private service: ArticleService
  ) { }

  ngOnInit(): void {
    this.service.getArticles()
    .toPromise()
    .then((res: any) => {
      this.articles = res.articles;
    })
    .catch((error: any) =>
    console.dir(error)
    );

  }

}
