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
  programs : any = [];
  slideOpts = {
    initialSlide: 1,
    speed: 1000,
    autoplay: true,
  };
  constructor(private streamingService : ServicesService) {
    this.getUrlStreaming();
    this.getPrograms();
    this.statusAudio = true;
  }

  playAudio(){    
   
    this.audio.src = this.urlStreamig;    
    this.audio.load();
    this.audio.play();
    this.statusAudio = false; 
    this.validatedProgramLive(); 
  }

  stopAudio(){
    this.audio.pause();
    this.statusAudio = true;
  }


  getUrlStreaming(){
    this.streamingService.getUrlStreaming().subscribe(
      res => {       
        this.urlStreamig = res[0].url;
        this.showSpinner = false;
      },
      error => {
        console.log(error)
      });
  }

  getPrograms(){
    this.streamingService.getPrograms().subscribe(
      res => {   console.log(res)    
        this.programs = res.map((obj) => {
          return { id: obj.id, nom: obj.nom, start_time: obj.start_time, end_time: obj.end_time, image: obj.image};
        });
      },
      error => {
        console.log(error)
      });

  }

  validatedProgramLive() {
    let today = new Date;
    console.log(today.getHours)
    /* for (let i = 0; i < this.programs.length; i++) {
      if (this.programs.start_time > today.getHours && this.programs < today.getHours) {
console.log()
      }
    }
 */
  }

}
