import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../services/services.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  showSpinner : boolean = true;
  newsDetail : any = []; 
  showToolbar = false;
  constructor(private activatedRoute : ActivatedRoute,
              private newsService : ServicesService  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.newsService.getNewsDetail(id).subscribe(
      res =>{       
       this.newsDetail = res;       
       this.showSpinner=false
      },
      error=> {

      });
  } 

}
