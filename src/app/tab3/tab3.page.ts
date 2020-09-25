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
  constructor(private contactService : ServicesService) {
    this.contactService.getContactInfo().subscribe(
      res => {             
        this.infoContact = res[0];
        this.showSpinner = false;
      },
      error => {
        console.log(error)
      });
  }

}
