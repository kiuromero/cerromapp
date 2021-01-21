import { Component } from "@angular/core";
import { ServicesService } from "../services/services.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  audio = new Audio();
  statusAudio: boolean;
  urlStreamig: string;
  showSpinner: boolean = true;
  programs: any = [];
  slideOpts = {
    initialSlide: 1,
    speed: 1000,
    autoplay: true,
  };

  programShow = {
    nom: "CERRO MURILLO STEREO",
    start_time: "06:00",
    end_time: "22:00",
    image:
      "https://www.cerromurillostereo.com/wp-content/uploads/2019/09/cropped-nuevo-logo-cerro-murillo-1-3.png",
  };

  constructor(private streamingService: ServicesService) {
    this.getUrlStreaming();
    this.getPrograms();
    this.statusAudio = true;
    //this.initializeApp();
  }

  playAudio() {
    this.showSpinner = true;
    this.validatedProgramLive();
    this.audio.src = this.urlStreamig;
    this.audio.load();
    this.audio.play();
    this.statusAudio = false;
    this.showSpinner= false;
   
  }

  stopAudio() {
    this.audio.pause();
    this.statusAudio = true;
    this.validatedProgramLive();
  }

  getUrlStreaming() {
    this.streamingService.getUrlStreaming().subscribe(
      (res) => {
        this.urlStreamig = res[0].url;
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPrograms() {
    this.streamingService.getPrograms().subscribe(
      (res) => {
        console.log(res);
        this.programs = res.map((obj) => {
          return {
            id: obj.id,
            nom: obj.nom,
            start_time: obj.start_time,
            end_time: obj.end_time,
            image: obj.image,
          };
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  validatedProgramLive() {
    let today = new Date();
    let hours = today.getHours();   
    for (let i = 0; i < this.programs.length; i++) {
      let hoursStart = this.programs[i].start_time.substring(0, 2);
      let hoursEnd = this.programs[i].end_time.substring(0, 2);
      if (Number(hoursStart) <= hours && Number(hoursEnd) >= hours) {
        this.programShow.nom = this.programs[i].nom;
        this.programShow.start_time = this.programs[i].start_time;
        this.programShow.end_time = this.programs[i].end_time;
        this.programShow.image = this.programs[i].image;
      }
    }  
  }

  ngOnInit() {
    this.validatedProgramLive();
  }
}
