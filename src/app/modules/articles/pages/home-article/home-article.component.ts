import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getArticles()
    .toPromise()
    .then((res: any) => {
      this.dataSource = new MatTableDataSource(res.articles);
      this.resultsLength = res.articles.length;
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

  edit(id: any){

    this.router.navigate(['./article/edit/' + id]);
  }

}
