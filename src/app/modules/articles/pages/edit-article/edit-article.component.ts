import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  form: FormGroup;

  title= new FormControl();
  slug= new FormControl()
  body= new FormControl()
  createdAt= new FormControl()
  updatedAt= new FormControl()
  description= new FormControl()
  userName= new FormControl()
  bio= new FormControl()
  image= new FormControl()
  following= new FormControl()
  favorited= new FormControl()
  favoritesCount= new FormControl()

  tagList: any[];
  loading= false;


  constructor(
    private route: ActivatedRoute,
    private service: ArticleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(param => {
      this.id = param['id'];
    });

    this.form = new FormGroup({
      title: this.title,
      slug: this.slug,
      body: this.body,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      description: this.description,
      userName: this.userName,
      bio: this.bio,
      image: this.image,
      following: this.following,
      favorited: this.favorited,
      favoritesCount: this.favoritesCount
    });

    this.appConfig();
  }

  appConfig(){
    debugger;
    this.service.getArticle(this.id)
    .toPromise().then((res: any) => {
      console.dir(res);
      if (res.article !== undefined && res.article){
        this.article = res.article;
        this.form.patchValue(this.article);
        this.setAuthorFields(this.article.author);
        this.tagList = this.article.tagList;
        console.dir(this.article);
      } else{
        this.alertService.error('Articulo no encontrado');
      }
    })
    .catch(error => { alert(error); });


  }

  setAuthorFields(author: any){
    this.form.get('userName').setValue(author.userName);// = ;
    this.form.get('bio').setValue(author.bio);
    this.form.get('image').setValue(author.image);
    this.form.get('following').setValue(author.following);

  }

  showPreview(event){
    debugger;
    const file = (event.target as HTMLInputElement).files[0];
  
    this.form.get('image').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.form.get('image').setValue(reader.result as string);
    }
    reader.readAsDataURL(file)
  }

  onSubmit(){
    if(this.form.invalid){
      return;

    }

  }

}
