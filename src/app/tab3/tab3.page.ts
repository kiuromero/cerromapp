import { Component } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  showSpinner : boolean = true;
  infoContact : any = [];
  gallery : any = [];
  slideOpts = {
    initialSlide: 1,
    speed: 1000,
    autoplay: true,
  };
  constructor(private contactService : ServicesService) {
    this.getContactInfo();
    this.getGalleryImages();
  }

  getContactInfo(){
    this.contactService.getContactInfo().subscribe(
      res => {             
        this.infoContact = res[0];
        this.showSpinner = false;
      },
      error => {
        console.log(error)
      });
  }

  getGalleryImages(){
    this.contactService.getGalleryImages().subscribe(
      res => {             
        this.gallery = res.map((obj) => {
          return { id: obj.id, image: obj.image};
        });
      },
      error => {
        console.log(error)
      });
  }



}
