import { Component,OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  news: any = [];
  newHome : any = [];
  showSpinner : boolean = true;
  slideOpts = {
    initialSlide: 1,
    speed: 1000,
    autoplay: true,
  };
  constructor(private newsService : ServicesService) {}

  ngOnInit() {
    this.getAllNews();
  }

  getAllNews(){
    this.newsService.getNews().subscribe(
      res => {  
        console.log(res)     
        this.newHome.id = res[0].id
        this.newHome.tittle = res[0].tittle
        this.newHome.image = res[0].image
        this.newHome.created_at = res[0].created_at
        this.news = res.map((obj) => {
          return { id: obj.id, tittle: obj.tittle, content: obj.content, image: obj.image, created_at: obj.created_at, short_content :obj.short_content };
        });
        this.showSpinner = false;
      },
      error => {
        console.log(error)
      });
  }


}
