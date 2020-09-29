import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/core/http/article.service';

@Component({
  selector: 'app-home-article',
  templateUrl: './home-article.component.html',
  styleUrls: ['./home-article.component.scss']
})
export class HomeArticleComponent implements OnInit {

  articlesData: any;

  dataSource: MatTableDataSource<any>;

  constructor(
    private service: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getArticles()
    .toPromise()
    .then((res: any) => {
      //this.articlesData = res.articles;
      this.dataSource = new MatTableDataSource(res.articles);
    })
    .catch((error: any) =>
    console.dir(error)
    );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPage(event: any){

  }


  edit(id: any){

    this.router.navigate(['./article/edit/' + id]);
  }

}
