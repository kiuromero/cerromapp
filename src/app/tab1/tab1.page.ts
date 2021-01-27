import { Component } from "@angular/core";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";
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
    initialSlide: 4,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400,
  };
  infoContact: any = [];
  programShow = {
    nom: "CERRO MURILLO STEREO",
    start_time: "06:00",
    end_time: "22:00",
    image: '',
  };

  constructor(
    private streamingService: ServicesService,
    private backgroundMode: BackgroundMode,
    private contactService: ServicesService
  ) {
    this.getUrlStreaming();
    this.getPrograms();
    this.getContactInfo();    
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
    this.showSpinner = false;
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

  async validatedProgramLive() {
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

  contactWhatsaap() {
    let urlWhatsapp;
    urlWhatsapp = "https://wa.me/57" + this.infoContact.whatsapp;

    if (this.isMobileDevice()) {
      urlWhatsapp = "https://wa.me/57" + this.infoContact.whatsapp;
    } else {
      urlWhatsapp = "https://web.whatsapp.com/send?phone=+57" + this.infoContact.whatsapp;
    }
    return window.open(urlWhatsapp, "_blank");
  }

  isMobileDevice() {
    return (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/CriOS/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    );
  }  

  getContactInfo() {
    this.contactService.getContactInfo().subscribe(
      (res) => {
        this.infoContact = res[0];
        this.programShow.image = this.infoContact.image_default
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
