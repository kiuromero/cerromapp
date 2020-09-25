import { Component} from '@angular/core';
import { ServicesService } from '../services/services.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {  
  audio = new Audio();
  statusAudio : boolean;
  urlStreamig : string;
  showSpinner : boolean = true;
  slideOpts = {
    initialSlide: 1,
    speed: 1000,
    //autoplay: true,
  };
  constructor(private streamingService : ServicesService) {
    this.streamingService.getUrlStreaming().subscribe(
      res => {       
        this.urlStreamig = res[0].url;
        this.showSpinner = false;
      },
      error => {
        console.log(error)
      });

    this.statusAudio = true;
  }

  playAudio(){    
   
    this.audio.src = this.urlStreamig;    
    this.audio.load();
    this.audio.play();
    this.statusAudio = false;  
  }

  stopAudio(){
    this.audio.pause();
    this.statusAudio = true;
  }

}
