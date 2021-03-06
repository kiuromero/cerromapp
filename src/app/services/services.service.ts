import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://api-app.cerromurillostereo.com/api/';

  getUrlStreaming(){
    return this.http.get<any>(this.apiUrl + 'streaming');
  }

  getNews(){
    return this.http.get<any>(this.apiUrl + 'news');
  }

  getNewsDetail(id){
    return this.http.get<any>(`${this.apiUrl}news/${id}`);
  }

  getContactInfo(){
    return this.http.get<any>(this.apiUrl + 'adress');
  }

  getCategories(){
    return this.http.get<any>(this.apiUrl + 'categories');
  }

  getNewsForCategory(id){
    return this.http.get<any>(`${this.apiUrl}news-category/${id}`);
  }

  getPrograms(){
    return this.http.get<any>(this.apiUrl + 'programs');
  }

  getGalleryImages(){
    return this.http.get<any>(this.apiUrl + 'gallery-images');
  }

  
}
